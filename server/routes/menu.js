const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Obter todos os itens do menu
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Adicionar um novo item ao menu
router.post('/', async (req, res) => {
  const { name, description, price, category } = req.body;
  const menuItem = new MenuItem({
    name,
    description,
    price,
    category
  });

  try {
    const newItem = await menuItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Atualizar a disponibilidade de um item
router.patch('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Item não encontrado' });

    menuItem.available = req.body.available;
    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um item do menu
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ message: 'Item não encontrado' });

    await menuItem.remove();
    res.json({ message: 'Item deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
