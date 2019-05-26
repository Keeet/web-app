export function getLocaleDateString(date) {
  const intDay = date.getDate()
  const intMonth = date.getMonth() + 1

  const day = intDay >= 10 ? intDay : `0${intDay}`
  const month = intMonth >= 10 ? intMonth : `0${intMonth}`

  return `${day}.${month}.${date.getFullYear()}`
}

export function getMonthName(date) {
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return names[date.getMonth()]
}

export function getWeekDayName(date) {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return names[date.getDay()]
}

export function getAmPmHours(date) {
  return `${getAmPmHoursValue(date)} ${getAmPm(date)}`
}

export function getAmPmTime(date) {
  const intHours = getAmPmHoursValue(date)
  const hours = intHours >= 10 ? intHours : `0${intHours}`
  const intMinutes = date.getMinutes()
  const minutes = intMinutes >= 10 ? intMinutes : `0${intMinutes}`

  return `${hours}:${minutes} ${getAmPm(date)}`
}

export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

export function addDays(d, number) {
  d.setDate(d.getDate() + number)
}

export function addMinutes(d, number) {
  d.setMinutes(d.getMinutes() + number)
}

export function stripISOTime(date) {
  const intDay = date.getDate()
  const intMonth = date.getMonth() + 1

  const day = intDay >= 10 ? intDay : `0${intDay}`
  const month = intMonth >= 10 ? intMonth : `0${intMonth}`

  return `${date.getFullYear()}-${month}-${day}`
}

function getAmPm(date) {
  const hours = date.getUTCHours()
  return hours >= 12 ? 'PM' : 'AM'
}

function getAmPmHoursValue(date) {
  let hours = date.getUTCHours()
  hours = hours % 12
  hours = hours === 0 ? 12 : hours
  return hours
}

export function groupByDay(entities, dateKey, resultEntitiesKey, sortByLatest = false) {
  entities = entities
    .slice()
    .sort((a, b) => a[dateKey] > b[dateKey] ? (sortByLatest ? -1 : 1) : (sortByLatest ? 1 : -1))

  const entitiesByDay = []
  let currentDayDate = null
  entities.forEach((entity) => {
    if (!currentDayDate || !isSameDay(entity[dateKey], currentDayDate)) {
      const newEntity = {
        date: entity[dateKey]
      }
      newEntity[resultEntitiesKey] = [entity]
      entitiesByDay.push(newEntity)
      currentDayDate = entity[dateKey]
    } else {
      entitiesByDay.slice(-1)[0][resultEntitiesKey].push(entity)
    }
  })
  return entitiesByDay
}