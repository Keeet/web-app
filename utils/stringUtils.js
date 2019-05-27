export const firstLetterUppercase = (string) => {
  return `${string.substr(0, 1).toUpperCase()}${string.substr(1).toLowerCase()}`
}

export const specialCharsToDashes = (string, lowerCase = true) => {
  const s = string.replace(/[^a-z0-9_]+/gi, '-')
  return lowerCase ? s.toLowerCase() : s
}

export const isNum = (string) => {
  return /^\d+$/.test(string)
}

export const isEmail = (string) => {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(string)
}
