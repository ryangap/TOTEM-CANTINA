import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Menu = ({ addToCart }) => {
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

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      <h2>Menu</h2>
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
            <button
              onClick={() => addToCart(item)}
              disabled={!item.available}
            >
              {item.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </button>
          </div>
        ))}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/cart">Ir para o Carrinho</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
