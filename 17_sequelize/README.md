# Sequelize
* DB하는 CRUD 작업을 query문 작성없이 할 수 있게 해주는 라이브러리

## 테스트 DB
* seq_db.sql 파일

## 초기 설정
* sequelize 구성 생성
  ```bash
  npm install global sequelize-cli
  
  sequelize init
  # 위 명령어 실행 시 config, migrations, models, seeders 폴더들과 
  # README.md, package.json 파일들이 생성됨
  ```
* DB 연결 - config/config.json 파일 수정
  ```bash
  {
    "development": {
      "username": "DB접속 아이디",
      "password": "DB접속 비밀번호",
      "database": "DB 이름",
      "host": "IP주소(로컬이면 127.0.0.1)",
      "dialect": "DB 종류(mysql, mariadb, sqlite 등)"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```

## 단편적인 정보

### HasOne은 관계키를 target모델에 생성하고 BelongsTo는 source모델에 생성함
```javascript
// User가 source이고 Project가 target인 경우
User.hasOne(Project); // Project에 fk column 생성
User.belongsTo(Project);
```
* Class형 모듈에서 외래키 만드는 예시
```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 이 위치에 association(예: 외래키) 작성
      models.user_profile.belongsTo( // user_profiles 테이블에 외래키 생성
        models.user,
        {
          foreignKey: {
            name: 'fk_user_id' // 생성될 컬럼 명
          },
          references: { // 연결할 테이블과 필드 명
            table: 'users',
            field: 'id'
          },
          onDelete: 'CASCADE', // 데이터 삭제시 연결된 두 컬럼 같이 삭제
          onUpdate: 'CASCADE' // update 발생 시 연결된 두 컬럼 모두에 적용
        }
      );
    }
  };
  User.init({
    user_id: DataTypes.STRING,
    user_password: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now")
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now")
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};
```

### 테이블 수정 사항은 migration 폴더의 파일로 수정
```javascript
// 1. migration 파일 수정(수정 예시: 기본키, 유일키, 외래키 등)

// 2. 다음 명령어 실행
npx sequelize-cli db:migrate

// 3. sequelizemeta 라는 테이블 생성 됨
```
* migration을 사용하는 이유 : 변경 로그가 남게 됨, 변경 사항을 되돌리고 싶을 때 사용할 수 있음

### findOne, findAll 등의 함수를 사용할 때 model 이름은 파일명을 따라감
* 예시
```javascript
// models/user.js 모델이 있는 경우
const models = require('../models');

const user = {};

user.findUser = async (req, res, next) => {
  try{
    // 아래의 "user"위치의 값이 models 폴더 내에 있는 모델 파일명과 동일함
    await models.user.findOne({
      attribute: ['id', 'name'],
      where: {
        name: req.body.name
      }
    }).then(data => {
      res.status(200).send(data);
    });
  }catch(e){
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = user;
```

### sequelize에서 join을 하려면 반드시 외래키를 지정해야함
* 외래키 지정없이 join을 하려면 raw query를 작성하면 됨
```javascript
user.joinTest = async function(req, res, next){
  let searchWord = req.body.word;
  try{
    /*
      - sequelize.query 에서 sequelize는 models/index.js 생성한 이름
      - 만약 다른 이름으로 정의했으면 그 이름으로 작성
    */
    await sequelize.query(`
      SELECT 
        us.id
        , us.user_id
        , up.user_name
      FROM users us
      JOIN userProfiles up
      ON us.id = up.fkUserId
      WHERE up.user_name LIKE '%${searchWord}%';
    `, {type: QueryTypes.SELECT}).then(data => {
      return res.status(200).send(data);
    });
  }catch(e){
    console.log(e);
    res.status(500).send(e);
  }
}
```
* 외래키는 가능한한 사용하지 않는게 좋음(제약이 커지기 때문)
<br>> 때문에 Sequelize를 사용하려면 처음에 DB 설계를 매우 체계적으로 해 놓는것이 좋아보임

### DB 여러개를 사용해야하는 경우 models/index.js 파일에서 .sequelize를 여러개 정의하면 됨
* 주의 사항
  * sequelize.query 같은 명령어(raw query를 작성할 때 사용)를 사용할 때 해당 DB의 변수 명을 사용해야함
  ```javascript
  // 예시 - models/index.js에서 아래와 같이 sequelize1, sequelize2로 정의한 경우
  let db = {};
  ...
  db.sequelize1 = sequelize1;
  db.sequelize2 = sequelize2;
  
  // 아래처럼 사용해야함
  // * sequelize1에 raw query를 사용해야하는 경우
  const { sequelize1, sequelize2 } = require('../models/index.js');

  test.rawQueryTest = (req, res, next) => {
    try{
      await sequelize1.query(`
        SELECT * FROM users LIMIT 10;
      `)
      .then(data => {
        res.status(200).send(data);
      })
    }catch(e){
      console.log(e);
      res.status(500).send(e);
    }
  }
  ```