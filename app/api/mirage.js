import * as miragejs from 'miragejs';
const { createServer, Model, RestSerializer  } = miragejs

export default function makeServer() {
  return createServer({
    serializers: {
      movie: undefined,
      user: RestSerializer
    },
    models: {
      user: Model,
      movie: Model,
    },
    routes() {
      this.resource('users')
      this.resource('movies')
    },
  })
}