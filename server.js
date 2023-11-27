const express = require('express')
const fs = require('fs')
const mysql = require('mysql2');
const links = require('./links/links');


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views' , 'public')
const port = 3621
const db = require('./db/db');
const blogRoutes = require('./routes/blog');

// Use the blog routes
app.use('/blog', blogRoutes);
// Middleware to pass links data to every view
app.use((req, res, next) => {
  // Assuming links.getGroupedLinks is asynchronous and takes a callback
  links.getGroupedLinks((err, groupedLinks) => {
    if (err) {
      console.error('Error getting grouped links:', err);
      return next(err);
    }
    res.locals.groupedLinks = groupedLinks;
    next();
  });
});

app.get('/', (req, res) => {
  links.getGroupedLinks((err, groupedLinks) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

    res.render('index', { groupedLinks });
  });
});

app.get('/neos', (req, res) =>{
  links.getGroupedLinks((err, groupedLinks) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
  
  res.render('neos', { groupedLinks })
})
})
app.get('/resonite', (req, res) =>{
  links.getGroupedLinks((err, groupedLinks) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
  res.render('resonite', { groupedLinks })
})
})
app.get('/bluesky-codes', (req, res) =>{
  db.query('SELECT * FROM `bs-codes` ', (err, results) => {
    if (err) throw err;


  links.getGroupedLinks((err, groupedLinks) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
  res.render('bs', { groupedLinks, results })
})
})
})



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})