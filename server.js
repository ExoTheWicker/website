const express = require('express')
const fs = require('fs')
const mysql = require('mysql2');
const links = require('./links/links');


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views' , 'public')
const port = 3621


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



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})