import makeServer from '../mirage.js'
const { expect } = chai

const server = makeServer()

async function request(method, url, data=null) {
  const headers = {
    'Content-Type': 'application/json2',
  }
  const options = {
    headers,
    method,
  }
  if (data) {
    options.body = JSON.stringify(data)
  }
  const res = await fetch(url, options)
  return res
}

describe("GET /users", () => {
  it("should return users array", async () => {
    const res = await request('GET', '/users') 
    const body = await res.json()

    expect(res.status).to.equal(200)
    expect(body.users.length).to.equal(3)
    expect(body.users[0].username).to.equal("user-1")
  })
})

describe("GET /users/:id", () => {  
  it("should return a user object", async () => {
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
  after(async () => {
    // reset db
  })
  
  it("should add new user", async () => {
    const res = await request('POST', '/users', params)
    const body = await res.json()

    expect(res.status).to.equal(201)
    expect(body.user.username).to.equal('john101')
  })
})

xdescribe("PUT /users/:id", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  before(async () => {
    await request('GET', '/users').post("/users").send(newItem)
  })
  after(async () => {
    await request('GET', '/users').delete(`/users/${newItem.id}`)
  })

  it("should update item if it exists", async () => {
    const res = await request('GET', '/users').put(`/users/${newItem.id}`)
      .send({
        id: 101,
        message: "updated using PUT"
      })
    expect(res.status).to.equal(200)
    expect(res.body.id).to.equal(101)
    expect(res.body.username).to.equal(undefined)
    expect(res.body.message).to.equal("updated using PUT")
  })
})

xdescribe("PATCH /users/:id", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  before(async () => {
    await request('GET', '/users').post("/users").send(newItem)
  })
  after(async () => {
    await request('GET', '/users').delete(`/users/${newItem.id}`)
  })

  it("should update item if it exists", async () => {
    const res = await request('GET', '/users').patch(`/users/${newItem.id}`)
      .send({
        id: 101,
        message: "updated using PATCH"
      })
    expect(res.status).to.equal(200)
    expect(res.body.id).to.equal(101)
    expect(res.body.username).to.equal('john101')
    expect(res.body.message).to.equal("updated using PATCH")
  })
})

xdescribe("DELETE /users/:id", () => {
  const newItem = {
    id: 101,
    username: 'john101'
  }
  before(async () => {
    await request('GET', '/users').post("/users").send(newItem)
  })
  it("should delete one item", async () => {
    const res = await request('GET', '/users').delete(`/users/${newItem.id}`)
    expect(res.status).to.equal(200)

    const res2 = await request('GET', '/users').get(`/users/${newItem.id}`)
    expect(res2.status).to.equal(404)
  })
})