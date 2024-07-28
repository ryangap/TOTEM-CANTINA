import React, { useState } from 'react';
import axios from 'axios';

const AddMenuItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('bebidas');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/menu', {
        name,
        description,
        price,
        category,
        available: true,
      });
      setName('');
      setDescription('');
      setPrice('');
      setCategory('bebidas');
      alert('Item adicionado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Adicionar Item ao Menu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Preço:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Categoria:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="bebidas">Bebidas</option>
            <option value="salgados">Salgados</option>
            <option value="lanches">Lanches</option>
            <option value="doces">Doces</option>
            <option value="almoco">Almoço</option>
          </select>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
