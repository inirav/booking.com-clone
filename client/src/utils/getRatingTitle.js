const getRatingTitle = (rating = 0) => {
  if (rating >= 9) return 'Excellent'
  else if (rating >= 8) return 'Very Good'
  else if (rating >= 7) return 'Good'
  else if (rating >= 6) return 'Pleasant'
  else if (rating >= 5) return 'Average'
  else return 'Not Good'
}

export default getRatingTitle
