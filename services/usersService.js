const { faker } = require('@faker-js/faker');

let users = [];
let nextId = 1;

function generate() {
  for (let i = 0; i < 10; i++) {
    users.push({
      id: nextId++,
      name: faker.person.firstName(),
      email: faker.internet.email()
    });
  }
}
generate();

function getAll() {
  return users;
}

function getById(id) {
  return users.find(u => u.id == id);
}

function create(data) {
  const newUser = { id: nextId++, ...data };
  users.push(newUser);
  return newUser;
}

function update(id, changes) {
  const index = users.findIndex(u => u.id == id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...changes };
  return users[index];
}

function remove(id) {
  const index = users.findIndex(u => u.id == id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
