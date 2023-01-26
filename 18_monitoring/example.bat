@ECHO OFF

rem 저장할 파일명에 넣을 날짜
FOR /F "tokens=1-3 delims=- " %%a IN ('DATE /T') DO (SET dt=%%a%%b%%c)

rem 지정한 서버의 지정한 DB 백업
ECHO Start MySQL database backup...
SET backupfilename=%dt%.sql
mysqldump -u root -p비밀번호 -h 서버IP DB이름 --hex-blob > C:\파일저장경로\파일명_%backupfilename%
ECHO Finished backup.

rem 오래된 파일 삭제
ECHO Delete old backup files over 1 month...
FORFILES /P C:\파일저장경로 /S /M *.sql /D -31 /C "cmd /c del @file"
ECHO Finshed backup.

