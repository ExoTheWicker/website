const express = require('express')
const db = require('../db/dbConnector')
var bodyParser = require('body-parser')

const blog = express.Router()


blog.get('/', (req, res) =>{
    db.query("SELECT * FROM blog",[req.params.id] ,(err, result) => {
        if (err) throw err;
    res.render('./blog/index', {articles: result})
})
})



blog.get('/new', (req, res) =>{
    res.render('blog/new')
})
blog.post('/new', (req, res) =>{
    db.query("INSERT INTO blog (title, content) VALUES (?, ?)", [req.body.title, req.body.content], (err, result) =>{
        if (err) throw err;
        res.redirect('/blog')
    })
})
blog.get('/:id', (req, res) =>{


    db.query("SELECT * FROM blog WHERE ID=?",[req.params.id] ,(err, result) => {
        if (err) throw err;
        if(result.length > 0){

            res.render('blog/article', {title: result[0].title, content: result[0].content, date: result[0].created})

            
        }else{
            res.status(404)
            res.render('blog/errors/404')
            //console.log(result)
            
        }
    })

})

blog.get('*', (req, res) =>{
    res.render('blog/errors/404')
})

module.exports = blog