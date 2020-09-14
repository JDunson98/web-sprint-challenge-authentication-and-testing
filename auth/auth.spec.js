const server = require('../api/server')
const supertest = require('supertest')
const db = require('../database/dbConfig')

afterAll(async () => {
    await db.destroy()
})

describe('auth router tests', () => {
    describe('register endpoint', () => {
        it('successfully creates a user', async () => {
            await supertest(server).post('/api/auth/register')
            .send({username: "newUser3", password: "password"})
            .then(res => {
                expect(res.statusCode).toBe(201)
            })
        })
    })

    describe('login endpoint', () => {
        it('successfully logs a user in', async() => {
            await supertest(server).post('/api/auth/login')
            .send({username: "newUser3", password: "password"})
            .then(res => {
                expect(res.statusCode).toBe(200)
            })
        })
        it('welcomes the user', async() => {
            await supertest(server).post('/api/auth/login')
            .send({username: "newUser3", password: "password"})
            .then(res => {
                expect(res.body).toEqual({message: "Welcome newUser3"})
            })
        })
    })
})