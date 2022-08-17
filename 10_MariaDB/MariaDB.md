# MariaDB
## 연결 방법

### createConnection()을 사용하는 방법
* DB에서 가져온 값을 callback을 사용하여 활용함
  ```javascript
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
  ```

### createPool()을 사용하는 방법
* DB에서 가져온 값을 Promise로 받아옴
  ```javascript
  const mariadb = require('mariadb');
  
  const Mariadb = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  
  app.post('/user', (req, res) => {
    Mariadb.getConnection()
      .then(conn => {
        conn.query('select * from user;')
          .then(data => {
            console.log(data);
            res.send(data);
          })
          .catch(err => console.log(err));
      })
      .catch(err -> console.log(err));
  });
  ```

# Auto-increment
* 10.2.3 버전 이전인 경우, 서버를 재시작하면 테이블의 최대갓이 초기화되고 auto-increment = n 효과가 사라짐
* 위 버전 이후에는 효과가 지속되도록 강화했으나 트랜젝션까지 보장되진 않음
* auto-increment 값을 관리하는 방법은 스토리지 엔진(InnoDB, MyISAM)에 따라 다름