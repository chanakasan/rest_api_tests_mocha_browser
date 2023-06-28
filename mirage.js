import * as miragejs from 'https://esm.run/miragejs';
const { createServer, Model, RestSerializer } = miragejs

const fixtures = {
  users: [
    { id: 1, username: "user-1" },
    { id: 2, username: "user-2" },
    { id: 3, username: "user-3" },
  ],
}

export default function() {
  return createServer({
    fixtures,
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