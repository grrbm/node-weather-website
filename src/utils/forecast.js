const request = require('request')

const api = 'https://api.darksky.net/forecast/6d68db2f6eb4bd19e853aaccac04d967/'

const forecast = (latitude,longitude,callback) => {

    const url = api+latitude+','+longitude
    request({url, json:true}, (error, response, body) => {
        if (error)
        {
            callback(error, body)
        }
        else if (body.error)
        {
            callback(body.error, body)
        }
        else
        {
            callback(undefined,body.daily.data[0].summary)
        }

    })


}

module.exports = forecast