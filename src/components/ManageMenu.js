import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('bebidas');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${itemId}`);
      setMenuItems(menuItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleAvailability = async (itemId) => {
    const item = menuItems.find(item => item._id === itemId);
    try {
      await axios.put(`http://localhost:5000/api/menu/${itemId}`, { available: !item.available });
      setMenuItems(menuItems.map(i => i._id === itemId ? { ...i, available: !i.available } : i));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      <h2>Gerenciar Menu</h2>
      <nav>
        <button onClick={() => setSelectedCategory('bebidas')}>Bebidas</button>
        <button onClick={() => setSelectedCategory('salgados')}>Salgados</button>
        <button onClick={() => setSelectedCategory('lanches')}>Lanches</button>
        <button onClick={() => setSelectedCategory('doces')}>Doces</button>
        <button onClick={() => setSelectedCategory('almoco')}>Almoço</button>
      </nav>
      <div>
        {filteredItems.map(item => (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
            <button onClick={() => handleToggleAvailability(item._id)}>
              {item.available ? 'Marcar como Indisponível' : 'Marcar como Disponível'}
            </button>
            <button onClick={() => handleDelete(item._id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMenu;
