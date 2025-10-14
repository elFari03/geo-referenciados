const express = require('express');
const router = express.Router();
const service = require('../services/productsService');

// GET
router.get('/', (req, res) => res.json(service.getAll()));

// GET por id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const p = service.getById(id);
  if (!p) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(p);
});

// POST
router.post('/', (req, res) => {
  try {
    const newP = service.create(req.body);
    res.status(201).json(newP);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  try {
    const updated = service.update(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = service.remove(id);
  if (!ok) return res.status(404).json({ message: 'Producto no encontrado' });
  res.status(204).send();
});

module.exports = router;
