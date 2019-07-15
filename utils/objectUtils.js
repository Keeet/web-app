export function copy(object) {
  if (!object) {
    return object
  }

  let v
  const bObject = Array.isArray(object) ? [] : {}
  for (const k in object) {
    v = object[k]
    bObject[k] = (typeof v === 'object') ? copy(v) : v
  }

  return bObject
}

export function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export function flatMap(value, mapperFunction = i => i) {
  return Array.isArray(value)
    ? [].concat(...value.map(x => flatMap(x, mapperFunction)))
    : mapperFunction(value)
}
