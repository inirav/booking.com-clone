import addDays from 'date-fns/addDays'

const getDatesFromRange = (startDate: Date, endDate: Date) => {
  const dates = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    dates.push(currentDate.getTime())
    currentDate = addDays(currentDate, 1)
  }

  return dates
}

export default getDatesFromRange
