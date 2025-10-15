const { faker } = require('@faker-js/faker');

let categories = [];
let nextId = 1;

function generate() {
  for (let i = 0; i < 5; i++) {
    categories.push({
      id: nextId++,
      name: faker.commerce.department()
    });
  }
}
generate();

function getAll() {
  return categories;
}

function getById(id) {
  return categories.find(c => c.id == id);
}

function create(data) {
  const newCategory = { id: nextId++, ...data }; // guarda cualquier campo extra
  categories.push(newCategory);
  return newCategory;
}

function update(id, changes) {
  const index = categories.findIndex(c => c.id == id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...changes };
  return categories[index];
}

function remove(id) {
  const index = categories.findIndex(c => c.id == id);
  if (index === -1) return false;
  categories.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
