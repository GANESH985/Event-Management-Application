const request = require('request')

const openWeatherMap={
    WEATHER_API_BASE_URL: "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=",
    WEATHER_API_KEY: '099b4f8919ae9a2f784bfff93b89c87f'
}
const weatherData = (address, callback) => {
    const url = openWeatherMap.WEATHER_API_BASE_URL+encodeURIComponent(address)+"&APPID"+openWeatherMap.WEATHER_API_KEY;
    console.log(url)
    request({url,json:true},(error, data) => {
        if(error){
            callback(true,'Unable to connect to weather service'+ error)
        }
        callback(false, data?.body)
    });
}
module.exports = weatherData