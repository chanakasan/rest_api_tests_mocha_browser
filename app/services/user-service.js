import { request } from '@app/utils.js'

async function getUsers() {
  const res = await request('GET', '/users') 
  const body = await res.json()
  return body.users
}

async function getUser(id) {
  if (!id) {
    throw new Error('You must provide an id');
  }
  const res = await request('GET', `/users/${id}`) 
  const body = await res.json()
  return body.user
}

async function createUser(attrs) {
  const params = {
    user: attrs
  }
  const res = await request('POST', `/users`, params) 
  const body = await res.json()
  return body.user
}

async function updateUser(id, attrs) {
  if (!id) {
    throw new Error('You must provide an id');
  }
  const params = {
    user: attrs
  }
  const res = await request('PATCH', `/users/${id}`, params) 
  const body = await res.json()
  return body.user
}

async function deleteUser(id) {
  if (!id) {
    throw new Error('You must provide an id');
  }
  const res = await request('DELETE', `/users/${id}`)
  if (res.status === 204) {
    return true
  }
  return false
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}