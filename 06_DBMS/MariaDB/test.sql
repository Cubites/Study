CREATE DATABASE if not exists test;

SHOW DATABASE;

USE test;

CREATE TABLE USER(
	id VARCHAR(100),
	password VARCHAR(100)
);

DROP TABLE USER;

DESC USER;

INSERT INTO user (id, password) VALUES
	('master', '123456'),
	('guest', '123');

SELECT * FROM USER;