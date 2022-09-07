# 쿼리문

## Primary Key
```sql
create table test(
    test_id int,
    ... ,
    CONSTRAINT PRIMARY KEY (test_id)
);
```
* Mariadb는 Primary key 이름 변경 불가 > 기본값 "PRIMARY"

## 날짜
* date, datetime 등이 있음
* column 타입이 datetime인 경우, 데이터 삽입
    ```sql
    insert date_table (write_date)
    values
        (Date_FORMAT('2022-08-30 12:24:34', '%Y-%m-%d %H:%i:%s'));
    ```
    * Date_FORMAT의 2번째 값에 <code>'%Y-%m-%d %H:%i:%s.%f'</code>를 넣으면 밀리초(ms)까지 입력 가능
        <br>> 단 column 타입을 <code>datetime(6)</code>으로 해야 함