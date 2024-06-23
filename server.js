console.log('Starting ExoWebOS...')
const express = require('express')
require('dotenv').config()
var colors = require('colors');

console.log('Connecting to SQL database...')
//const sql = require('./db/dbConnector')

const app = express()
const serveIndex = require('serve-index')

// Define setting and middleware for Express

// Set the Express view engine to use EJS
app.set('view engine', 'ejs')

// Set the static directory to 'public'

app.use(express.static('public/assets'))

app.set('views', 'public/views')

// Routes and Routers

// Define a route that intentionally causes an error
app.get('/error', (req, res, next) => {
    // Here we throw an error deliberately
    const error = new Error('Intentional error for testing');
    // You can also customize the error by setting its properties
    error.status = 500; // Set HTTP status code for the error
    // Pass the error to the next middleware
    next(error);
});

app.use('/blog', require('./routes/blog'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/files', express.static('public/files'), serveIndex('public/files', {template: './public/views/ftp.ejs', 'icons': true}))

app.get('/links', (req, res) => {
    res.render('links')
})

app.get('/liny', (req, res) => {
    res.render('liny')
})

app.get('/nsfw_info', (req, res) => {
    res.render('nsfw_info')
})

app.use(require('./functions/error_handeler'))

app.route('*')
    .post((req, res) =>{
        res.render('errors/404')
    })
    .get((req, res) =>{
        res.render('errors/404')
    })
    .patch((req, res) =>{
        res.render('errors/404')
    })
    .delete((req, res) =>{
        res.render('errors/404')
    })

app.listen(process.env.PORT)

console.log('All checks ' + 'OK! '.green + ' starting server on port '.brightGreen + process.env.PORT .brightGreen)