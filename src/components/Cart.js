import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cart, removeFromCart }) => {
  const [customerName, setCustomerName] = useState('');

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        customerName,
        items: cart,
      });
      alert('Pedido realizado com sucesso!');
      setCustomerName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Carrinho</h2>
      <div>
        {cart.map(item => (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
            <button onClick={() => removeFromCart(item._id)}>Remover</button>
          </div>
        ))}
      </div>
      <div>
        <label>Nome do Cliente:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <button onClick={handleCheckout} disabled={!customerName || cart.length === 0}>Finalizar Compra</button>
    </div>
  );
};

export default Cart;
