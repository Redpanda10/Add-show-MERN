import { useState } from 'react';
import axios from 'axios';

function App() {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);
    const [isDataVisible, setIsDataVisible] = useState(true);

    const handleCreate = async () => {
        if (!text) return;
        try {
            await axios.post('http://localhost:5000/api/data', { text });
            setText('');
            fetchData(); // Refresh data after saving
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleHide = () => {
        setIsDataVisible(false);
    };

    const handleShow = () => {
        setIsDataVisible(true);
        fetchData(); // Refresh data when showing
    };

    return (
        <div>
            <h1>React + Vite + Node.js</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleShow}>Show</button>
            <button onClick={handleHide}>Hide</button>
            {isDataVisible && (
                <ul>
                    {data.map((item) => (
                        <li key={item._id}>{item.text}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;