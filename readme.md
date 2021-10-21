# Travel App

Udacity Frontend Nanodegree Capstone Project

## About the project

This project aims to give me the opportunity to put all of the skills I have learned into one project to build my own custom travel app.

This project consist of a travel app that obtains a desired trip location along with a start and end date from the user. 
Based on this information the app displays the weather and an image of the location using information obtained from external APIs.
After successful submission of a trip, the app saves the trip information to local storage for later use. 

Trip functionality:
- save and delete a trip from local storage
- display a trip on a google map

## Getting the project running

There are a numebr of steps required to get the project running after cloning or downloading the project.

Below are the steps to run the project:

1. Add a .env file
    - Create a [Geonames](http://www.geonames.org/export/web-services.html) account 
      - Add your username as a variable
        - GEONAMES_USERNAME = ******* your username ********** 
    - Create a [Weatherbit](https://www.weatherbit.io/account/create) account 
      - Add your api key as a variable
        - WEATHERBIT_API_KEY = ******* your api key ********** 
    - Create a [Pixabay](https://pixabay.com/api/docs/)  account
      - Add your api key as a variable
        - PIXABAY_API_KEY = ******* your api key ********** 
    - Create a [Google Maps](https://developers.google.com/maps) account
      - Enable Maps Javascript API
      - Add your api key as a variable 
        - GOOGLE_MAP_API_KEY  = ******* your api key **********

2. Install required dependencies via ( npm install )

3. Build the project via (npm run webpack-prod)
    - This allows for offline usage via service workers if your browser allows

4. After the project is built start the server via ( npm run server-start )

### Testing the project

To run the project make sure the server is not running as supertest will automatically start the server.

Below are the steps to test the project:
- Run the command(npm run jest-test)
