const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()


console.log('dirname = '+__dirname)
const publicDirectoryPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('',(req,res) => {
  res.render('index', {
    title: 'Weatherer',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About page',
    name: 'Andrew Mead'
  })

})  

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some help text',
    title:'Help page',
    name: 'Andrew Mead'
  })

})  


app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
      return res.send({error: 'You must provide a search term !'})
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
      if (error)
      {
        return res.send({error})
      }
      forecast(latitude,longitude, (error,data) => {
        if (error)
        {
          return res.send({error})
        }
        res.send({ 
          forecast: data,
          location: location,
          address: req.query.address
        })
      })
      
    })
    

})

app.get('/products', (req, res) => {
  if (!req.query.search)
  {
    return res.send({error: 'You must provide a search term !'})
  }

  res.send({
    products: []
  })

})

app.get('/help/*', (req, res) => {
  res.render('404',{
    title: '404',
    name:'Andrew Mead',
    helpfulMsg: 'Help article not found'
  })

})  

app.get('*', (req, res) => {
    res.render('404',{
      title: '404',
      name:'Andrew Mead',
      helpfulMsg: 'Page not found'
    })

})  


app.listen(3000, () => {
    console.log('server is running on port 3000.')
})