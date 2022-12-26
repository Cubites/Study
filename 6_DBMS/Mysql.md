# Mysql 명령어
## DB 명령어
  | 명령어 | 설명 |
  | --- | --- |
  | <code>create database DB이름</code> | DB 생성 |
  | <code>use DB이름</code> | DB를 사용함 |
  | <code>show database</code> | DB 목록 조회 |
  | <code>drop database DB이름</code> | DB 삭제 |

## Table 명령어
### 테이블 생성, 삭제
* 생성
  ```sql
  create table [테이블이름](
      컬럼명 타입 조건, 조건, ...,
      컬럼명 타입 조건, 조건, ...,
      ...
  );
  ```
* 삭제
  ```sql
  drop table 테이블명
  ```

### 속성 조회
```sql
-- 테이블 컬럼 정보 조회
desc 테이블명;

-- 특정 DB의 특정 테이블 정보 조회
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema='DB명' and table_name='테이블명';

-- 특정 DB에 있는 외래키 조회
select * from information_schema.table_constraints 
where 
  constraint_schema = 'tmp_datatest' 
  and constraint_TYPE = 'FOREIGN KEY';
```

### 데이터 조회
```sql
-- 테이블의 모든 데이터 조회
select * from 테이블명;

-- 데이터 수(열 갯수) 조회
select count(*) from 테이블명;

-- 테이블의 해당 컬럼의 데이터 모두 조회
select 컬럼명 from 테이블명;

-- 테이블의 해당 컬럼에서 찾을단어와 같은 단어가 있는 행의 데이터 모두 조회
select * from 테이블명 where 컬럼명 = 찾을단어;

-- 특정 날짜 이후 데이터 조회
SELECT * FROM 테이블명 WHERE 날짜값이_있는_컬럼명 > '2022-08-01 00:00:00';
```

### 테이블 데이터 삽입
```sql
-- 특정 컬럼에만 데이터를 넣는 법
insert into 테이블명 (컬럼명, 컬럼명, ...)
  value 
    (데이터, 데이터, ...),
    (데이터, 데이터, ...),
    (데이터, 데이터, ...);

-- 모든 컬럼에 데이터 넣는 법
insert into 테이블명
  value 
    (데이터, 데이터, ...),
    (데이터, 데이터, ...),
    (데이터, 데이터, ...);
-- 단, 넣는 데이터 수는 컬럼 수와 동일해야 함
-- 이 방법은 컬럼명을 명시하지 않는 방법이라 문제가 생길 여지가 큼
-- 컬럼명도 같이 적는 전자의 방법을 사용하는 것을 권장함
```

### 테이블 데이터 삭제
* <code>delete from 테이블명 where 컬럼명 = 데이터;</code>
  <br>: 테이블에서 해당 컬럼의 데이터 중 비교한 데이터와 일치한 행의 데이터 삭제