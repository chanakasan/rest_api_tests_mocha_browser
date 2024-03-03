export async function request(method, url, data=null) {
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