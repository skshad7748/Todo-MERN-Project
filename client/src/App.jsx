import { useState } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app">
      <h1>MERN CRUD Application</h1>
      <ItemForm onAdd={() => setRefresh(!refresh)} />
      <ItemList refresh={refresh} />
    </div>
  );
}

export default App;