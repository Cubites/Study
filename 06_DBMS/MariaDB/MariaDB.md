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
  * DB와 연결이 필요할 때만 연결되고 통신이 끝나면 연결이 끊어짐
  * 장점 : 연결이 필요할 때만 연결하여 리소스를 절약할 수 있음
  * 단점 : DB와의 통신이 잦은 경우, 연결을 끊고 다시 연결하는 과정이 많아 오히려 리소스가 낭비됨

### createPool()을 사용하는 방법 with async-await
* DB에서 가져온 값을 Promise로 받아옴
  ```javascript
  const mariadb = require('mariadb');
  
  const Mariadb = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  
  app.post('/user', async (req, res) => {
    try {
      const conn = await Mariadb.getConnection();
      try{
        const userData = await conn.query('select * from user;');
        res.status(200).send({success: true, data: userData});
      }catch{
        console.log('쿼리 에러 발생');
        res.status(404).send({success: false, reason: 'Invalid Request'})
      }
    }catch{
      console.log('DB connection 에러');
      res.status(500).send({success: false, reason: 'DB Connection Error'});
    }
  });
  ```
  * DB와의 연결을 유지해 놓는 상태로 요청을 처리하는 방법
  * 장점 : DB와의 통신이 잦은 경우 연결을 끊고 다시 연결하는 리소스를 절약할 수 있음
  * 단점 : DB와의 통신이 드문 경우, 리소스가 낭비됨

# Auto-increment
* 10.2.3 버전 이전인 경우, 서버를 재시작하면 테이블의 최대갓이 초기화되고 auto-increment = n 효과가 사라짐
* 위 버전 이후에는 효과가 지속되도록 강화했으나 트랜젝션까지 보장되진 않음
* auto-increment 값을 관리하는 방법은 스토리지 엔진(InnoDB, MyISAM)에 따라 다름