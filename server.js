const express = require('express')
require('dotenv').config()

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

app.use('/ftp', express.static('public/files'), serveIndex('public/files', {'icons': true, template: 'public/views/ftp.html'}))

app.listen(process.env.PORT)
console.log('Starting ExoTheWicker website Server on port ' + process.env.PORT)