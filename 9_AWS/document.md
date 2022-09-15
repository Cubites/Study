# EC2
* 인스턴스 : 인스턴스 하나가 컴퓨터 하나라고 생각하면 됨

## 로드 밸런싱 > 대상그룹
* Auto Scaling 그룹을 생성할 때 생성 대상을 생성해 두는 기능
* 기존에 존재하는 인스턴스로 만든 AMI(Amazon Machine Image)을 사용함
  <br>> 수정사항 발생시 AMI을 새로 만들어서 대상그룹에 등록

## https 접속, SSL 인증서 적용 방법
### 필요한 것
* 메인 서버(인스턴스)
* 탄력적 IP (생성 후, 실행 중인 인스턴스와 연결되어 있지 않으면 요금이 부과됨)
* 대상 그룹
* 로드 밸런서
* 도메인 : AWS Route53 서비스에서 구매 가능
* SSL 인증서 : Route53에서 도메인 구매 시, Certificate Manager 서비스에서 무료 제공

### 과정
#### 1. 로드 밸런서에 넣을 대상 그룹(target group) 생성
* EC2 > 로드 밸런싱 > 대상그룹 에서 target group 생성 선택
  <br>> target type은 Instance, Protocol과 Port는 기본값(HTTP, 80)
  <br>> health check에서 상태확인을 위해 경로 지정(예: /health)
  <br>> 다음으로 넘어감
  <br>> 메인 서버(인스턴스)를 선택하고 포트지정(Include as pending below)
  <br>> 하단 목록에 추가됨을 확인한 후 target group 생성

#### 2. 로드 밸런서 생성
* EC2 > 로드 밸런싱 > 로드 밸런서 에서 로드 밸런서 생성 선택
  <br>> Application Load Balancer 선택
  <br>> 로드 밸런서 이름 작성
  <br>> Network mapping > Mappings 에서 2개 선택 (예: ap-northease-2a, 2d 선택)
  <br>> Security groups에서 보안 그룹 선택(http, https 두가지 모두 있어야 함)
  <br>> Listeners and routing 에서 HTTP 80, HTTPS 443 두가지를 만든 후 Default action에 앞에서 만든 대상 그룹 입력
  <br>> 로드 밸런서 생성

#### 3. 도메인에 레코드 추가
* Route53 > 호스팅 영역 에서 구매해 놓은 도메인에 있는 레코드 생성 선택
 <br>> 레코드 이름은 공백
 <br>> 레코드 유형 : A - IPv4 주소 및 일부 AWS 리소스로 트래픽 라우팅
 <br>> 별칭 선택 후, "Application/Classic Load Balancer에 대한 별칭" 선택
 <br>> 아시아 태평양(서울) 리전 선택
 <br>> 앞에서 만들어둔 로드 밸런서 선택 후, 레코드 생성

 #### 4. HTTPS로 접속되는 것 확인

## React build 파일 수정
```bash
# git에서 변경사항 적용
git pull

# client 폴더 안에서 기존 build 폴더 삭제
rm -rf build

# react 다시 build
npm run build
```

# RDS
* cloud Database 서비스