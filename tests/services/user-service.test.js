import { expect } from 'chai'
import makeServer from '@app/api/mirage.js'
import userService from '@app/services/user-service.js'

const fixtures = {
  users: [
    { id: 1, username: "user-1" },
    { id: 2, username: "user-2" },
    { id: 3, username: "user-3" },
  ],
}

describe("UserService", () => {
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

  describe("userService.getUsers()", () => {
    it("should return list of all items", async () => {
      const users = await userService.getUsers()
      expect(users.length).to.equal(3)
      expect(users[0].username).to.equal("user-1")
    })
  })

  describe("userService.getUser(id)", () => {  
    it("should return item object if exist", async () => {
      const user = await userService.getUser(1)
      expect(user.username).to.equal('user-1')
    })
  })

  describe("userService.createUser(attrs)", () => {  
    const attrs = {
      username: 'john101'
    }
    before(async () => {
      expect(server.db.dump().users.length).to.equal(3)
    })
    afterEach(async () => {
      resetDb()
    })
    
    it("should add new item", async () => {
      const user = await userService.createUser(attrs)
      expect(server.db.dump().users.length).to.equal(4)
      expect(user.username).to.equal('john101')
    })
  })

  describe("userService.updateUser(id, attrs)", () => {  
    const attrs = {
      message: "updated using PATCH",
    }
    afterEach(async () => {
      resetDb()
    })
    
    it("should update item if exist", async () => {
      const user = await userService.updateUser(1, attrs)
      expect(user.id).to.equal('1')
      expect(user.username).to.equal('user-1')
      expect(user.message).to.equal("updated using PATCH")
    })
  })

  describe("userService.deleteUser(id)", () => {
    afterEach(async () => {
      resetDb()
    })
    it("should delete item if exists", async () => {
      const result = await userService.deleteUser(1)
      expect(result).to.equal(true)
      expect(server.db.dump().users.length).to.equal(2)
      expect(server.db.dump().users[0].username).to.equal('user-2')
    })
  })
})