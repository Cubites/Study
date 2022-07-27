# MariaDB
## 연결 방법

### createConnection()을 사용하는 방법
* DB에서 가져온 값을 callback을 사용하여 활용함
<pre>
const mariadb = require('mariadb/callback');

const Mariadb = mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.post('/user', (req, res) => {
    console.log(req.body);
    Mariadb.query('select * from user;', (err, rows) => {
        if(err) return res.send(err);
        res.send(rows);
    })
});
</pre>

### createPool()을 사용하는 방법
* DB에서 가져온 값을 Promise로 받아옴
<pre>
const mariadb = require('mariadb');

const Mariadb = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

Mariadb.getConnection();

app.post('/user', (req, res) => {
    Mariadb.query('select * from user;')
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => res.send(err));
});
</pre>