# GitLab
* github 처럼 형상 관리를 할 수 있는 툴
* 빌드, 테스트 등 개발의 일련의 과정을 자동화 할 수도 있음

## Sourcetree
* GitLab을 사용하기 편하게 보조해주는 툴

### 병합(Merge)
* 다른 브랜치의 변경 사항을 현재 브랜치로 가져와 합치는 작업
* 과정 예(A브랜치에 B브랜치를 병합하려는 경우)
    1. 현재 선택한 브랜치는 A브랜치인 상태여야 함
    <br/>(좌측 브랜치 목록에서 더블클릭하여 이동 가능)
    2. sourcetree의 병합을 누르고 병합할 브랜치(B브랜치) 클릭 후 확인
    3. 충돌이 발생한 경우, 해당 파일들에 충돌 사항이 자동 기록되므로 확인하고 정리 후 커밋하고 풀 진행

## GitLab 관련 Linux 명령어
```bash
# gitlab 설정 적용(generate)
sudo gitlab-ctl reconfigure

# gitlab 재시작
sudo gitlab-ctl restart

# gitlab 상태 보기
sudo systemctl status gitlab-runsvdir

# gitlab 중지
sudo gitlab-ctl stop

# gitlab 실행
sudo gitlab-ctl start

# gitlab 서비스 삭제
sudo gitlab-ctl uninstall
```

## GitLab 설정 파일 경로
```bash
# /etc/gitlab/gitlab.rb
# /var/opt/gitlab/
# /opt/gitlab/embedded/service/gitlab-rails/app/views
```