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
