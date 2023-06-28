import * as miragejs from 'https://esm.run/miragejs';
const { createServer, Model, RestSerializer } = miragejs

export default function() {
  return createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      user: Model,
    },
    routes() {
      this.resource('users')
    },
  })
}