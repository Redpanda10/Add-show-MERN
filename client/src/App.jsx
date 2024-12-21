import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

// Modal custom styles
const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#c4ea70',
    padding: '20px',
    borderRadius: '15px',
    width: '400px',
    border: '1px solid black',
  },
};

function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(true);
  const [btn, setBtn] = useState('Hide');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all tasks
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle adding a new task
  const handleCreate = async () => {
    if (!text.trim()) return alert('Please enter text.');
    try {
      await axios.post('http://localhost:5000/api/data', { text });
      setText('');
      fetchData();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle updating a task
  const handleUpdate = async () => {
    if (!currentItem?.text.trim()) return alert('Please enter text.');
    try {
      await axios.put(`http://localhost:5000/api/data/${currentItem._id}`, {
        text: currentItem.text,
      });
      setIsOpen(false);
      setCurrentItem(null);
      fetchData();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Toggle visibility of the task list
  const toggleVisibility = () => {
    setIsDataVisible(!isDataVisible);
    setBtn(isDataVisible ? 'Show' : 'Hide');
  };

  return (
    <div className="main-board">
      <h1>TO-DO list</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleCreate}>Add Task</button>
      <button onClick={toggleVisibility}>{btn}</button>

      {isDataVisible && (
        <ul className="list-item">
          {data.map((item) => (
            <li className="task-item" key={item._id}>
              <div>{item.text}</div>
              <button
                onClick={() => {
                  setCurrentItem(item);
                  setIsOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for editing a task */}
      {modalIsOpen && currentItem && (
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={currentItem.text}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, text: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
