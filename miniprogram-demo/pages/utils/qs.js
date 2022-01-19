
module.exports = {
  parse (str) {
    const arr = str.split('&')
    return arr.reduce((res, v) => {
      const [key, value] = v.split('=')
      res[key] = value
      return res;
    }, {})
  },
  stringify(obj) {
    return Object.keys(obj).reduce((res, key) => {
      res += `&${key}=${obj[key]}`
      return res
    }, '').slice(1)
  }
}