const server = require('../api/server')
const supertest = require('supertest')
const db = require('../database/dbConfig')

afterAll(async () => {
    await db.destroy()
})

describe('jokes router tests', () => {
    describe('get jokes endpoint', () => {
        it("gives the correct status", () => {
            supertest(server).get('/api/jokes').then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('gives error if not authorized', () => {
            supertest(server).get('/api/jokes').then(res => {
                expect(res.body).toEqual({err: "invalid credentials"})
            })
        })
    })
})