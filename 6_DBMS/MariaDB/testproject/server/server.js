const express = require('express');
const mariadb = require('mariadb/callback');
const dotenv = require('dotenv');

const app = express();

app.set('port', 4000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
dotenv.config();

const Mariadb = mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.post('/user', (req, res) => {
    let user = req.body;
    Mariadb.query(`select password from user where id = "${user.id}";`, (err, data) => {
        if(err) return res.send(err);
        if(data[0].password == user.password){
            res.send('login success');
        }else{
            res.send('login fail');
        }
    })
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
});