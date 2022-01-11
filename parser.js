module.exports = (response) => {
  response = JSON.parse(response || {}) || {}
  let operator = (response.stream || '').split('@')
  let pair = operator[0].toString()
  let fn = operator.slice(1).join('@')

  return [pair, fn, (response.data || {})]
}
