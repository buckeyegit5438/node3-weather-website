const path = require('path')
const { response } = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


console.log(__dirname);  // C:\Users\dmcmillen\Documents\CCM\Training\O'Reilly Node.js Training 10-2020\NODE-COURSE\Chapter7\NODE-COURSE\web-server\src
//console.log(__filename);  // C:\Users\dmcmillen\Documents\CCM\Training\O'Reilly Node.js Training 10-2020\NODE-COURSE\Chapter7\NODE-COURSE\web-server\src\app.js
console.log(path.join(__dirname, '../public'));

const express = require('express');
const app = express();

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and view location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Charlie Brown'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Charlie Brown'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Charlie Brown'
    });
});


// Weather endpoint
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    // Get the forecast for the specified location.
    // Note: a default value has now been given to the destructuring of the results for the
    // call to "geocode".  Previously, if the call to "geocode" was successful then we didn't
    //  get a destructured object for the results--the results would have been undefined.  However,
    // we now assign a default value (i.e., "= {}") for the result.  This gives us an object, which
    // is defined.  However, the three values in the object, latitude, longitude and location, are
    // undefined.
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });

    });
});

// Test endpoint
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    });
});















app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Charlie Brown'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Charlie Brown'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
