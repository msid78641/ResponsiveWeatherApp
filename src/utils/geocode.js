// const request = require('request');

// const geoCode = (address,callback) =>{
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXNpZDc4NjQxIiwiYSI6ImNraGlyZGJ6ejB0amwyeHA2YjZjbWxxNDQifQ.EApVNPmXEeD-vrBqFB9y0Q&limit=1`
//      request({url,json:true},(error,{body})=> {
//         if(error) {
//             callback("Unable to connect to Geocode Api",undefined);
//         }else if(body.features.length === 0) {
//             callback("Unable to find the mentioned place",undefined);
//         }else {
//             callback(undefined,{
//                 longitude:body.features[0].center[0],
//                 lattitude:body.features[0].center[1],
//                 location:body.features[0].place_name
//             });
//         }
//      });
// }

// module.exports = geoCode;

const request = require('request');
const axios = require('axios');

const geoCode = async(address) =>{
   
    const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXNpZDc4NjQxIiwiYSI6ImNraGlyZGJ6ejB0amwyeHA2YjZjbWxxNDQifQ.EApVNPmXEeD-vrBqFB9y0Q&limit=1')
    return response
}

module.exports = geoCode;