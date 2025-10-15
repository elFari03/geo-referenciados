const express = require('express');
const router = express.Router();
const service = require('../services/usersService');

// GET
router.get('/users', (req, res) => {
  const users = service.getAll();
  res.json(users);
});

// GET por id
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
});

// POST
router.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  // Validación de campos obligatorios
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Campos requeridos: name, email y password' });
  }

  const newUser = service.create({ name, email, password });
  res.status(201).json(newUser);
});

// PUT
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // Validación de campos obligatorios
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Campos requeridos: name, email y password' });
  }

  const updatedUser = service.update(id, { name, email, password });
  if (!updatedUser) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(updatedUser);
});


// DELETE
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const del = service.remove(id);
  if (!del) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json({ message: 'Usuario eliminado correctamente' });
});

module.exports = router;
