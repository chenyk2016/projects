/**
 * 获取数据类型
 * @param {*} 数据
 * @returns
 */
module.exports.getType = function getType (v) {
  return Object.prototype.toString
    .call(v)
    .replace(/\[object\s(\w+)\]/, '$1')
    .toLowerCase()
}

module.exports.isArray = function (v) { return getType(v) === 'array' }