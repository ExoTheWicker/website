const express = require('express')

const blog = express.Router()

blog.get('/', (req, res) =>{
    res.render('./blog/index')
})

module.exports = blog