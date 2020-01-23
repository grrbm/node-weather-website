const request = require('request')



const geocode = (address, callback) => {
    
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3JyYm0iLCJhIjoiY2szcmhiYnZ0MDA5dTNtcXlsMXpiMjF1dSJ9.wNd5D_DDl-roQ9KyvMDqyQ&limit=1'
    
    if (!address)
    {
        url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ .json?access_token=pk.eyJ1IjoiZ3JyYm0iLCJhIjoiY2szcmhiYnZ0MDA5dTNtcXlsMXpiMjF1dSJ9.wNd5D_DDl-roQ9KyvMDqyQ&limit=1'
    }
    

    request({url, json:true}, function (error, response, {features}) {

        if (error)
        {
            callback(undefined,"Couldn't connect")
        }
        else if (features.length === 0)
        {
            callback(undefined,"Couldn't get the location from the server")
        }
        else
        {
            const data = {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            }
            callback(error, data)
            
        }

    })    

}
module.exports = geocode