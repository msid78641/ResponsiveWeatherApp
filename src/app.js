//nodemon src/app.js -e js/hbs to run js and hbs file while running code

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser');
// const frontEndJs = require('../public/js/app');


const geoCode = require('./util/geocode');
const foreCast = require('./util/foreCast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
//For Partials path
//const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'ejs')
app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(bodyParser.urlencoded({extended: false}));


const init = (obj) => {
    obj.temperature = undefined;
    obj.place = undefined;
    obj.windSpeed=undefined;
    obj.windDir=undefined;
    obj.pressure=undefined;
    obj.humidity=undefined;
    obj.cloudCover=undefined;
    obj.weatherDesc=undefined;
    obj.obsTime=undefined;
    obj.weatherIcon=undefined;
    return obj;
}

const err = {
    info:"Enter city name to get the weather details",
}

let object = {};
let date= {};

app.get('/',(req,res,next) => {

    const timeStamp = Date.now();

    const dateObj = new Date(timeStamp);
    const day = dateObj.getDate();
    let month = dateObj.getMonth()+1;
    const year = dateObj.getFullYear();

    date = {
        day,
        month,
        year,
    }

    let isDefined = true;
    if(!object.temperature) {
        object = init(object);
        isDefined = false;
        date = {};
    }
    res.render('index',{
        info:err.info,
        ...object,
        isDefined,
        date,
    });
    object = init(object);
    err.info = "Enter city name to get the weather details";
})

app.post('/postWeatherData',(req,res,next)=> {
    const location = req.body.location;
    // console.log(location);
    if(!location) {
        err.info = "Please Enter a city name";
        return res.redirect('/');
    }else {
        let resGeoCode;
        geoCode(location).then((response) => {
            resGeoCode =response;
            const features = response.data.features[0];
            const longitude = features.center[0];
            const lattitude = features.center[1];
            // console.log(longitude,lattitude);
            return foreCast(longitude,lattitude)

        }).then(response => {
            const current = response.data.current;
                if(!current) {
                    err.info = "Sorry weather details for the mentioned city do not exist in the database";
                    return res.redirect('/');
                }
                object.temperature =current.temperature,
                object.place=resGeoCode.data.features[0].place_name.split(',')[0],
                object.windSpeed=current.wind_speed,
                object.windDir=current.wind_dir,
                object.pressure=current.pressure,
                object.humidity=current.humidity,
                object.cloudCover=current.cloudcover,
                object.weatherDesc=current.weather_descriptions[0],
                object.obsTime=current.observation_time,
                object.weatherIcon=current.weather_icons[0]
                res.redirect('/');
            
        }).catch(error => {
            console.log(error);
        });
    }
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
    })
})

app.listen(3000)