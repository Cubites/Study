const express = require('express');
const app = express();
const mysql = require('mysql');

const port = process.env.PORT || 4000;

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "123456",
   port: "3306",
   database: "study01"
});
console.log(connection);
connection.connect((err) => { if(err) console.log(err);});

app.listen(app.get('port'), () => console.log(`Listening on port ${port}`));