const express = require('express');
const router = express.Router();
const service = require('../services/categoriesService');
const productsService = require('../services/productsService');

// GET
router.get('/', (req, res) => res.json(service.getAll()));

// GET por id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const cat = service.getById(id);
  if (!cat) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.json(cat);
});

// POST
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nombre es requerido' });
  const newCat = service.create({ name });
  res.status(201).json(newCat);
});

// PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const updated = service.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.json(updated);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const used = productsService.getAll().some(p => p.categoryId === id);
  if (used) return res.status(409).json({ message: 'No se puede eliminar: existen productos usando esta categoría' });

  const ok = service.remove(id);
  if (!ok) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.status(204).send();
});

module.exports = router;
