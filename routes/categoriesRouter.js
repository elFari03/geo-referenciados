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
  const { name, descripcion, precio, imagen, brandId } = req.body; // ahora validamos más campos

  if (!name || !descripcion || precio == null || !imagen || !brandId) {
    return res.status(400).json({ message: 'Todos los campos son requeridos: name, descripcion, precio, imagen, brandId' });
  }

  const newCat = service.create({ name, descripcion, precio, imagen, brandId });
  res.status(201).json(newCat);
});

// PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, descripcion, precio, imagen, brandId } = req.body;

  if (!name || !descripcion || precio == null || !imagen || !brandId) {
    return res.status(400).json({ message: 'Todos los campos son requeridos: name, descripcion, precio, imagen, brandId' });
  }

  const updated = service.update(id, { name, descripcion, precio, imagen, brandId });
  if (!updated) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.json(updated);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const used = productsService.getAll().some(p => p.categoryId === id);
  if (used) return res.status(409).json({ message: 'No se puede eliminar: existen productos usando esta categoría' });

  const del = service.remove(id);
  if (!del) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.status(204).send();
});

module.exports = router;
