const dateChecker = function (userDate) {
  // Get the current date object
  const currentDate = new Date();

  // Get the current milliseconds
  const currentMiliseconds = currentDate.getTime();
  // Get theuser milliseconds
  const userMilliseconds = userDate.getTime();

  // If userMilliseconds less than currentMilliseconds date is in pass, retunr 0
  if (userMilliseconds < currentMiliseconds) return 0;
  // Return the difference between the milliseconds
  // divided by the numebr of milliseconds in the day to get the difference in days
  // Round up to avoid half days
  return Math.ceil((userMilliseconds - currentMiliseconds) / (1000 * 3600 * 24));
};

// Exports
export default dateChecker;
