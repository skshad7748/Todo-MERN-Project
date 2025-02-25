import axios from 'axios';
import { useEffect, useState } from 'react';

const ItemList = ({ refresh }) => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
      } catch (err) {
        setError('Failed to fetch items',err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [refresh]);

  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      setError('Please enter a valid name');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/items/${id}`, {
        name: editName
      });

      // Properly update state with the updated item from server response
      setItems(prevItems => 
        prevItems.map(item => 
          item._id === id ? res.data : item
        )
      );
      
      setEditingId(null);
      setEditName('');
      setError('');
    } catch (err) {
      setError('Failed to update item');
      console.error('Update error:', err.response?.data);
    }
  };

  // Rest of the component remains the same
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(prevItems => prevItems.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditName(item.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="item-list">
      {items.map(item => (
        <div key={item._id} className="item-card">
          {editingId === item._id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="edit-input"
              />
              <div className="button-group">
                <button 
                  onClick={() => handleUpdate(item._id)}
                  className="save-btn"
                >
                  Save
                </button>
                <button 
                  onClick={cancelEdit}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="item-content">
              <span>{item.name}</span>
              <div className="button-group">
                <button 
                  onClick={() => startEdit(item)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;