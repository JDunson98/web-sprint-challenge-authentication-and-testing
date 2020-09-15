const db = require('../database/dbConfig')

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
    .where ('id', id)
}

function findBy(filter) {
    return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}

async function add(user) {
    const [id] = await db('users')
    .insert(user)
    return findById(id)
}

module.exports = {
    find,
    findById,
    findBy,
    add,
}