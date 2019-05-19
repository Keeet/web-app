export function getLocaleDateString(date) {
  const intDay = date.getDate()
  const intMonth = date.getMonth() + 1

  const day = intDay >= 10 ? intDay : `0${intDay}`
  const month = intMonth >= 10 ? intMonth : `0${intMonth}`

  return `${day}.${month}.${date.getFullYear()}`
}

export function getMonthName(month) {
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return names[month]
}

export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDay() === d2.getDay()
  )
}
