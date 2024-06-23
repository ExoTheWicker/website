var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.MYSQL_Host,
  user: process.env.MYSQL_User,
  password: process.env.MYSQL_Password,
  database: process.env.MYSQL_Database
});

console.log("[Database] Connecting to: [" + con.config.database + "] as [" + con.config.user + "]");

con.connect(function(err) {
  if (err){
    console.log('['.gray + ' FAILURE '.red + ']'.gray +' Connection to MYSQL Database has failed...' )
    process.exit(1)
  }
  //bold out the database name
  console.log("[Database] Connected and now accepting queries to the database.");
  console.log("[Database] Connection ID: " + con.threadId);
});

module.exports = con;