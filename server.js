const express = require('express')
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')
const port = 3621

app.get('/', (req,res) =>{
  res.render('index');
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})