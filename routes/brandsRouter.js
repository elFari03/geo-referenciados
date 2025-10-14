const express = require('express');
const router = express.Router();
const brandsService = require('../services/brandsService');
const productsService = require('../services/productsService');

//GET
router.get('/', (req, res) => res.json(brandsService.getAll()));

// GET por id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const b = brandsService.getById(id);
  if (!b) return res.status(404).json({ message: 'Marca no encontrada' });
  res.json(b);
});

// POST
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nombre es requerido' });
  const newB = brandsService.create({ name });
  res.status(201).json(newB);
});

// PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const updated = brandsService.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Marca no encontrada' });
  res.json(updated);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const used = productsService.getAll().some(p => p.brandId === id);
  if (used) return res.status(409).json({ message: 'No se puede eliminar: existen productos usando esta marca' });

  const del = brandsService.remove(id);
  if (!del) return res.status(404).json({ message: 'Marca no encontrada' });
  res.status(204).send();
});

module.exports = router;
