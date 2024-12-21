import { useState,useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Modal from 'react-modal'

Modal.setAppElement('#root') 

const customStyles={
    content:{
        top: '10%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#c4ea70',
        padding: '20px',
        borderRadius: '15px',
        Height:'200px',
        Width:'600px',
        maxHeight: '50%',
        maxWidth: '70%',
        display: 'flex',
        alignItems: 'center',
        border:'1px solid black',
        transparency: 'transparent',
    }
}

function App() {
    const [text, setText] = useState('')
    const [data, setData] = useState([])
    const [isDataVisible, setIsDataVisible] = useState(true)
    const [btn, setbtn] = useState("Hide")

    const [modalIsOpen, setIsOpen] = useState(false);


// Fetch data from the backend when the component mounts
    useEffect(() => {
        fetchData();
        }, []);


    const handleCreate = async () => {
        if (!text) return alert("Please enter something.");
        if(btn==="Hide") {
            try {
                await axios.post('http://localhost:5000/api/data', { text });
                setText('');
                fetchData(); // Refresh data after saving
            } catch (error) {
                console.error('Error saving data:', error);
            }
            setIsDataVisible(true)
        }
        else{
            try {
                await axios.post('http://localhost:5000/api/data', { text });
                setText('');
                fetchData(); // Refresh data after saving
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
        
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/data');
            if(!response) return alert('No data available')
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggle=()=>{
        if(btn==='Hide'){
            setbtn("Show");
            setIsDataVisible(false);
            fetchData()
        }
        else{
            setbtn("Hide");
            setIsDataVisible(true)
        }
    }
  
    const handleDelete=async (id) => {
        
            try {
              const response = await axios.delete(`http://localhost:5000/api/data/${id}`);
              setData(data.filter((item) => item._id !== id));
              console.log(response.data);
            } catch (error) {
              console.error('Error deleting data:', error);
            }

            // Refresh data after deleting
            fetchData();
          }

    const updateItem = async(id,text)=>{
        try {
          await axios.put(`http://localhost:5000/api/data/${id}`, { text });
           // Clear input field after updating
            setIsOpen(false); // Close modal after updating
            fetchData(); // Refresh data after updating
            setText('');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    return (<>
    <div className='main-board'>
            <h1>React + Vite + Node</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={handleCreate}>Create</button>
            <button  onClick={toggle}>{btn}</button>
            {isDataVisible && (
                <ul className='list-item'>
                    {data.map((item) => (
                        <li className='task-item'
                        key={item._id}><div>{item.text}</div>
                        <button onClick={()=>{setIsOpen(true) }}>edit</button>
                         <Modal 
                         isOpen={modalIsOpen}
                         style={customStyles}>
                             <form>
                                 <input type="text" placeholder='input' value={text} onChange={(e)=>setText(e.target.value) }/>
                                 <button onClick={()=>{updateItem(item._id,text)}}>Update</button>
                             </form>
                        </Modal> 
                        <button className='delete-btn' onClick={()=>handleDelete(item._id)} >Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
        
    );
}

export default App;