const express = require('express')
require('dotenv').config()
var colors = require('colors');

const app = express()
const serveIndex = require('serve-index')

// Define setting and middleware for Express

// Set the Express view engine to use EJS
app.set('view engine', 'ejs')

// Set the static directory to 'public'

app.use(express.static('public/assets'))

app.set('views', 'public/views')



// Routes and Routers

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/files', express.static('public/files'), serveIndex('public/files', {'icons': true}))

app.get('/links', (req, res) => {
    res.render('links')
})

app.get('/liny', (req, res) => {
    res.render('liny')
})

app.get('/nsfw_info', (req, res) => {
    res.render('nsfw_info')
})

app.listen(process.env.PORT)
console.log('Starting ExoWebOS...' .yellow)
console.log('Connecting to SQL database...')
console.log('Checking SkyAura API for status...')
console.log('checking WickerAPI status...')
console.log('All checks ' + 'OK! '.green + ' starting server on port '.brightGreen + process.env.PORT .brightGreen)