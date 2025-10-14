const { faker } = require('@faker-js/faker');
const brandsService = require('./brandsService');
const categoriesService = require('./categoriesService');

let products = [];
let nextId = 1;

function generate() {
  for (let i = 0; i < 10; i++) {
    products.push({
      id: nextId++,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.url(),
      brandId: brandsService.getAll()[0].id, // asigna primera marca
      categoryId: categoriesService.getAll()[0].id // asigna primera categoría
    });
  }
}
generate();

function getAll() {
  return products;
}

function getById(id) {
  return products.find(p => p.id == id);
}

function create(data) {
  // Validar brandId y categoryId
  if (!brandsService.getById(data.brandId)) throw new Error('Marca no existente');
  if (!categoriesService.getById(data.categoryId)) throw new Error('Categoría no existente');

  const newProduct = { id: nextId++, ...data };
  products.push(newProduct);
  return newProduct;
}

function update(id, changes) {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) return null;

  if (changes.brandId && !brandsService.getById(changes.brandId)) throw new Error('Marca no existente');
  if (changes.categoryId && !categoriesService.getById(changes.categoryId)) throw new Error('Categoría no existente');

  products[index] = { ...products[index], ...changes };
  return products[index];
}

function remove(id) {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}


module.exports = { getAll, getById, create, update, remove };
