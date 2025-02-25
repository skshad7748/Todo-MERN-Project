import axios from 'axios';
import { useState } from 'react';

const ItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter an item name');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/items', { name });
      setName('');
      setError('');
      onAdd(); // Trigger refresh
    } catch (err) {
      setError('Error adding item');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          placeholder="Enter item name"
        />
        <button type="submit">Add Item</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ItemForm;