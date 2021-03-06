const request = require('postman-request');


const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid='+ process.env.OPEN_WEATHER_MAP_KEY +'&units=metric';

    request({url,json:true},(error,{body})=>{
        if(error) {
            callback('Cannot Connect to the weather Services',undefined);
        } else if(body.error) {
            callback('Unable to find location.. Please enter another one',undefined);
        } else {
            const imageURL = 'http://openweathermap.org/img/wn/'+ body.weather[0].icon +'@2x.png';
            callback(undefined,body.weather[0].description+". It is currently "+body.main.temp+" degrees out. It feels like "+body.main.feels_like+" degrees out.",imageURL);
        }
    });
} 

module.exports = forecast;