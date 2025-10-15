const { faker } = require('@faker-js/faker');
const brandsService = require('./brandsService');
const categoriesService = require('./categoriesService');

let products = [];
let nextId = 1;

function generate() {
  const allBrands = brandsService.getAll();
  const allCategories = categoriesService.getAll();

  for (let i = 0; i < 10; i++) {
    products.push({
      id: nextId++,
      name: faker.commerce.productName(),
      descripcion: faker.commerce.productDescription(),
      precio: Number(faker.commerce.price()),
      imagen: faker.image.url(),
      brandId: allBrands[Math.floor(Math.random() * allBrands.length)].id,
      categoryId: allCategories[Math.floor(Math.random() * allCategories.length)].id
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
