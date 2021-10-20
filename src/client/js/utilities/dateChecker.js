const dateChecker = function (firstDate, secondDate) {
  // If second less than first return -1
  if (secondDate < firstDate) return -1;
  // Return the difference between the milliseconds
  // divided by the number of milliseconds in the day to get the difference in days
  // Round up to avoid half days
  return Math.ceil((secondDate - firstDate) / (1000 * 3600 * 24));
};

// Exports
export default dateChecker;
