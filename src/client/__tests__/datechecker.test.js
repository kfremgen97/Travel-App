// Imports
import dateChecker from '../js/utilities/dateChecker';

// Datechecker suite
describe('Date Checker', () => {

  // Test 1: Make sure there can be no date in the past
  test('Invalid past date', () => {
    // Number of milliseconds for 1/1/20 12:oopm
    const pastDate = 1577898000000;
    // Get the result of the date checker
    const result = dateChecker(Date.now(), pastDate);
    // If -1 returned, invalid date
    expect(result).toEqual(-1);
  });

  // Test 2: Make sure second date is not be before first date
  test('Invalid second date', () => {
    // 10/27/2021 12pm
    const firstDate = 1635350400000;
    // 10/20/2021 12pm
    const secondDate = 1634745600000;
    // Get the result of the date checker
    const result = dateChecker(firstDate, secondDate);
    // If -1 returned, invalid date
    expect(result).toEqual(-1);
  });

  // Test 3: Make sure second date is 3 days away
  test('3 days apart', () => {
    // 10/20/2021 12pm
    const firstDate = 1634745600000;
    // 10/23/2021 12pm
    const secondDate = 1635004800000;
    // Get the result of the date checker
    const result = dateChecker(firstDate, secondDate);
    // The days are 3 days apart
    expect(result).toEqual(3);
  });

  // Test 3: Make sure second date is 7 days away
  test('7 days apart', () => {
    // 10/20/2021 12pm
    const firstDate = 1634745600000;
    // 10/27/2021 12pm
    const secondDate = 1635350400000;
    // Get the result of the date checker
    const result = dateChecker(firstDate, secondDate);
    // The days are a full week apart i.e 7 days
    expect(result).toEqual(7);
  });

  // Test 3: Make sure second date is 10 days away
  test('10 days apart', () => {
    // 10/20/2021 12pm
    const firstDate = 1634745600000;
    // 10/30/2021 12pm
    const secondDate = 1635609600000;
    // Get the result of the date checker
    const result = dateChecker(firstDate, secondDate);
    // The days are 10 days apart
    expect(result).toEqual(10);
  });
});
