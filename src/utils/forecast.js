// const request = require('request');

// const forecast = (longitude,lattitude,callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=e8923dbe9274d3ec04e5d6d3c4735d96&query=${longitude},${lattitude}&units=f`;
//     request({url,json:true},(error,{body}) => {
//         if(error) {
//             callback("Unable to connect to weather Api",undefined);
//         }else if(body.error) {
//             callback("Unable to find the mentioned place",undefined);
//         }else {
//             callback(undefined,body.current);
//         }
//     });
// }

// module.exports = forecast;

const request = require('request');
const axios = require('axios');

const forecast = async (longitude,lattitude) => {
    const response = await axios.get('http://api.weatherstack.com/current?access_key=e8923dbe9274d3ec04e5d6d3c4735d96&query='+longitude+','+lattitude+'&units=f')
    return response
}

module.exports = forecast;