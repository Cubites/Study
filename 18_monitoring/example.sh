#!/bin/sh

# 저장할 파일명에 넣을 날짜
DATE=`date +"%Y%m%d"`

# 삭제할 파일명 찾을 때 사용할 날짜
PREV_DATE=`date --date '1 months ago' +"%Y%m%d"`

# 지정한 서버의 지정한 DB 백업
echo "Backup Database..."
mysqldump -u root -p비밀번호 -h 서버IP --databases DB이름 --hex-blob > /파일경로/파일명_${DATE}.sql
echo "Finished backup."

# 1달 이상된 파일 삭제
echo "Delete files that made over 1 month..."
rm -rf  /파일경로/파일명_${PREV_DATE}.sql
rm -rf  /파일경로/파일명_${PREV_DATE}.sql
echo "Finished delete files."
