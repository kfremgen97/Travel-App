const dateChecker = function (firstDate, secondDate = Date.now()) {
  // If userMilliseconds less than currentMilliseconds date is in pass, return -1
  if (firstDate < secondDate) return -1;
  // Return the difference between the milliseconds
  // divided by the numebr of milliseconds in the day to get the difference in days
  // Round up to avoid half days
  return Math.ceil((firstDate - secondDate) / (1000 * 3600 * 24));
};

// Exports
export default dateChecker;
