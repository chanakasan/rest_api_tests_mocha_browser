import * as miragejs from 'https://esm.run/miragejs';
const { createServer, Model } = miragejs
const { expect } = chai

const fixtures = {
  movies: [
    { id: 1, name: "Inception", year: 2010 },
    { id: 2, name: "Interstellar", year: 2014 },
    { id: 3, name: "Dunkirk", year: 2017 },
  ],
}

let server = createServer({
  fixtures,
  models: {
    movie: Model,
  },
  routes() {
    this.resource("movies")
  },
})

async function request(method, url, data=null) {
  const headers = {
    'Content-Type': 'application/json',
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


describe("GET /movies", () => {
  it("should return movies array", async () => {
    const res = await request('GET', '/movies') 
    const body = await res.json()

    expect(res.status).to.equal(200)
    expect(body.movies.length).to.equal(3)
    expect(body.movies[0].name).to.equal("Inception")
  })
})

describe("POST /movies", () => {
  const params = {
    data: {
      type: "movies",
      attributes: {
        name: "Hello",
        year: 2010,
      },
    }
  }
  it("create a new movie", async () => {
    const res = await request('POST', '/movies', params) 
    const body = await res.json()

    console.log(body)
    expect(res.status).to.equal(201)
    expect(body.movie.name).to.equal("Hello")
  })
})