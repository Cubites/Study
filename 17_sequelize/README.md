# Sequelize
* DB하는 CRUD 작업을 query문 작성없이 할 수 있게 해주는 라이브러리

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
