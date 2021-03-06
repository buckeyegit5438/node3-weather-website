const request = require('request');

// Sample invocation:
//
// forecast(-82.7899, 40.7337, (error, data) => {
//     //forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error);
//     console.log('Data', data);
// });


//
// Goal: Add new data to the forecast
//
// 1. Update the forecast string to include new data
// 2. Commit your changes
// 3. Push your changes to GitHib and deploy to Heroku
// 4. Test your work in the live application!
//



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8394c12551c47ee3f633741fa0ea847d&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        }
        else {

            // const { error } = response.body;
            // console.log('response.body.error: ' + response.body.error);
            // console.log('error: ' + error);

            if (body.error) {
                callback('Unable to find location.  Try another search.', undefined);
            }
            else {
                callback(
                    undefined,
                    //'It is currently ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike + ' degrees out.'
                    body.current.weather_descriptions[0] + '.  It is currently ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike + ' degrees out.  Humidity is ' + body.current.humidity + '%.'
                );
            }
        }
    });
}

module.exports = forecast