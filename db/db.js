// db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'exo-web-user',
  password: '*Vkq)6NX/g!4zw7j',
  database: 'exo-web',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
  console.log('Connected to the database');
});

module.exports = db;
