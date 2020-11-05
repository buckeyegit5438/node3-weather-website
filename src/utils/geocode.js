const request = require('request');

// Sample invocation:
//
// geocode('Mansfield Ohio', (error, data) => {
//     console.log('Error: ', error);
//     console.log('Data: ', data);
// });


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=2&access_token=pk.eyJ1IjoiZGJtYWM0NS10ZXN0LW5vZGUiLCJhIjoiY2tndGo5aXB1MWFhaTJzcjNqamdqcXcydiJ9.Pv3sepIVjcAG-tWdLBVfdw';

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location.  Try another search.', undefined);
        }
        else {
            const result = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            };
            callback(undefined, result);

            // callback(undefined, {
            //     latitude: response.body.features[0].center[1],
            //     longitude: response.body.features[0].center[0],
            //     location: response.body.features[0].place_name
            // })
        }
    });
}

module.exports = geocode
