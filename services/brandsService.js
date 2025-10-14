const { faker } = require('@faker-js/faker');

// Autoincrementable para que los id no se vean así xd: 2jsu2k-72kd62-gte2k8-iis0kf
let brands = [];
let nextId = 1;


function generate() {
  for (let i = 0; i < 4; i++) {
    brands.push({
      id: nextId++,
      name: faker.company.name()
    });
  }
}
generate();



function getAll() {
  return brands;
}

function getById(id) {
  return brands.find(b => b.id == id);
}

function create(data) {
  const newBrand = { id: nextId++, ...data };
  brands.push(newBrand);
  return newBrand;
}

function update(id, changes) {
  const index = brands.findIndex(b => b.id == id);
  if (index === -1) return null;
  brands[index] = { ...brands[index], ...changes };
  return brands[index];
}

function remove(id) {
  const index = brands.findIndex(b => b.id == id);
  if (index === -1) return false;
  brands.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove, generate };
