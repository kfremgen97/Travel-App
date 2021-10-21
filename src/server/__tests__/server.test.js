const request = require('supertest');
const app = require('../app');

// Api testing suite
describe('API testing', () => {
  // Api default testing
  test('Testing endpoint', () => {
    // Pass in the http server to the request(),i.e the express app
    // Call the express endpoint
    // Then test its response
    return request(app)
      .get('/api/test')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      });
  });

  // API location testing
  test('Location endpoint', () => {
    return request(app)
      .get('/api/location?location=miami')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      });
  });

  // API current weather testing
  test('Weather endpoint', () => {
    return request(app)
      .get('/api/weather/current?lat=25.77427&lng=-80.19366')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      });
  });

  // API photo testing
  test('Photo endpoint', () => {
    return request(app)
      .get('/api/photo?location=miami')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
      });
  });

  // Close the server
  afterAll(() => {
    app.close();
  });
});
