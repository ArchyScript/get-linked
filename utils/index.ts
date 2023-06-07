export const formatNumber = (number: number) => {
  if (!number) return '0'
  return (Math.round(number * 100) / 100).toLocaleString()
}

export const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  const date_string = new Date(dateString)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const year = date_string.getFullYear()
  const month = months[date_string.getMonth()]
  let date: any = date_string.getDate()

  const formattedDate = `${month} ${date} , ${year}`
  return formattedDate
}

export const getPercentageRatio = (fraction: number, total: number) => {
  const ratio = fraction / total
  const result = ratio * 100
  return Math.ceil(result)
}
