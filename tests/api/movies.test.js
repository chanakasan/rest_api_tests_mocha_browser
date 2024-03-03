import { expect } from 'chai'
import makeServer from '@app/api/mirage.js'
import { request } from '@app/utils.js'

const fixtures = {
  movies: [
    { id: 1, name: "Inception", year: 2010 },
    { id: 2, name: "Interstellar", year: 2014 },
    { id: 3, name: "Dunkirk", year: 2017 },
  ],
}

describe("Movies API", () => {
  let server = null

  beforeEach(function() {
    server = makeServer()
    server.db.loadData(fixtures)
  })

  afterEach(function() {
    server.shutdown()
  })

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

      expect(res.status).to.equal(201)
      expect(body.movie.name).to.equal("Hello")
    })
  })
})