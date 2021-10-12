const dateChecker = function (userDate) {
  // Get the current date in milliseconds
  const currentDate = Date.now();

  // If userMilliseconds less than currentMilliseconds date is in pass, return -1
  if (userDate < currentDate) return -1;
  // Return the difference between the milliseconds
  // divided by the numebr of milliseconds in the day to get the difference in days
  // Round up to avoid half days
  return Math.ceil((userDate - currentDate) / (1000 * 3600 * 24));
};

// Exports
export default dateChecker;
