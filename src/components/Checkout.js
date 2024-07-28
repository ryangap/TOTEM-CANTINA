import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [customerName, setCustomerName] = useState('');

  const handleOrderSubmit = () => {
    // Implementar lógica de envio do pedido à cozinha
  };

  return (
    <div>
      <h2>Finalizar Compra</h2>
      <input
        type="text"
        placeholder="Nome"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <button onClick={handleOrderSubmit}>Enviar Pedido à Cozinha</button>
      <nav>
        <ul>
          <li>
            <Link to="/">Voltar ao Menu</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Checkout;
