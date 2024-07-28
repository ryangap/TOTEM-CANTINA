import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './components/MenuList';
import Cart from './components/Cart';
import AddMenuItem from './components/AddMenuItem';
import ManageMenu from './components/ManageMenu';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Menu</Link></li>
            <li><Link to="/cart">Carrinho</Link></li>
            <li><Link to="/add">Adicionar Item</Link></li>
            <li><Link to="/manage">Gerenciar Menu</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Menu addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/add" element={<AddMenuItem />} />
          <Route path="/manage" element={<ManageMenu />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
