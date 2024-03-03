import { expect } from 'chai'
import makeServer from '@app/api/mirage.js'
import { request } from '@app/utils.js'

const fixtures = {
  users: [
    { id: 1, username: "user-1" },
    { id: 2, username: "user-2" },
    { id: 3, username: "user-3" },
  ],
}

describe("Users API", () => {
  let server = null
  
  beforeEach(function() {
    server = makeServer()
    server.db.loadData(fixtures)
  })

  afterEach(function() {
    server.shutdown()
  })

  function resetDb() {
    server.db.emptyData()
    server.db.loadData(fixtures)
  }

  describe("GET /users", () => {
    it("should return items list", async () => {
      const res = await request('GET', '/users') 
      const body = await res.json()

      expect(res.status).to.equal(200)
      expect(body.users.length).to.equal(3)
      expect(body.users[0].username).to.equal("user-1")
    })
  })

  describe("GET /users/:id", () => {  
    it("should return item object if exist", async () => {
      const res = await request('GET', '/users/1')
      const body = await res.json()

      expect(res.status).to.equal(200)
      expect(body.user.username).to.equal('user-1')
    })
  })

  describe("POST /users", () => {
    const params = {
      user: {
        username: 'john101'
      }
    }

    before(async () => {
      expect(server.db.dump().users.length).to.equal(3)
    })

    afterEach(async () => {
      resetDb()
    })
    
    it("should add new item", async () => {
      const res = await request('POST', '/users', params)
      const body = await res.json()

      expect(res.status).to.equal(201)
      expect(server.db.dump().users.length).to.equal(4)
      expect(body.user.username).to.equal('john101')
    })
  })

  describe("PUT /users/:id", () => {
    const params = {
      user: {
        message: "updated using PUT"
      }
    }
    afterEach(async () => {
      resetDb()
    })

    it("should update item if exists", async () => {
      const res = await request('PUT', '/users/1', params)
      const body = await res.json()
      const result = body.user
      
      expect(res.status).to.equal(200)
      expect(result.id).to.equal('1')
      // expect(result.username).to.equal(undefined)
      expect(result.message).to.equal("updated using PUT")
    })
  })

  describe("PATCH /users/:id", () => {
    const params = {
      user: {
        message: "updated using PATCH"
      }
    }
    afterEach(async () => {
      resetDb()
    })

    it("should update item if exists", async () => {
      const res = await request('PATCH', '/users/1', params)
      const body = await res.json()
      const result = body.user

      expect(res.status).to.equal(200)
      expect(result.id).to.equal('1')
      expect(result.username).to.equal('user-1')
      expect(result.message).to.equal("updated using PATCH")
    })
  })

  describe("DELETE /users/:id", () => {
    afterEach(async () => {
      resetDb()
    })
    it("should delete item if exists", async () => {
      const res = await request('DELETE', '/users/1')

      expect(res.status).to.equal(204)
      expect(server.db.dump().users.length).to.equal(2)
      expect(server.db.dump().users[0].username).to.equal('user-2')
    })
  })
})