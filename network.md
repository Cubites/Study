## DHCP
* Dynamic Host configuration Protocol의 약자
* 유무선 IP 환경에서 단말의 다양한 네트워크 정보를 DHCP 서버가 PC와 같은 이용자 단말에 동적으로 할당해 주는 프로토콜
* 다양한 네트워크 정보에는 다음과 같은 것들이 포함됨
  * IP 주소
  * 서브넷 마스크(Subnet Mask)
  * 기본 게이트웨이(Default gateway) IP 주소
  * DNS 서버 IP 주소
  * 임대기간(Lease Time)

### 1. DHCP의 네트워크 정보 할당 절차
#### 1-1. DHCP Discover
  * PC와 같은 단말(DHCP 클라이언트) => DHCP 서버
  * 단말이 동일 서브넷(랜)에 위치하는 DHCP 서버를 찾기 위해 보내는 메시지
  * 단말이 DNCP Discover 메시지를 이더넷 망에 브로드캐스팅
  * 동일 서브넷 상의 모든 DHCP 서버들이 수신
#### 1-2. DHCP Offer
  * 단말 <= DHCP 서버
  * DHCP Discover 메시지를 받은 DHCP 서버가 자신의 존재를 알리기 위해 보내는 메시지
  * 단말이 필요로하는 네트워크 정보들을 메시지에 포함함
  * DHCP 서버가 DHCP Offer 메시지를 브로드캐스팅
  * 동일 서브넷 상의 모든 단말들이 수신
#### 1-3. DHCP Request
  * 단말 => DHCP 서버
  * DHCP Offer 메시지를 받은 단말이 네트워크 정보 요청을 위해 보내는 메시지
  * 메시지의 Server Identifier(Option 54)필드에 목적지 DHCP 서버의 IP주소를 기록하여 보냄
  * 단말이 DHCP Request 메시지를 브로드캐스팅
  * 동일 서브넷 상의 모든 DHCP 서버들이 수신
#### 1-4. DHCP Ack
  * 단말 <= DHCP 서버
  * Server Identifier(Option 54)에 기록된 IP주소와 일치하는 DHCP 서버가 단말에 보내는 메시지
  * 단말에 필요한 네트워크 정보를 담아서 보냄. 대표적인 네트워크 정보는 다음과 같음
    * IP 주소
    * Subnet Mask
    * Default Gateway IP 주소
    * DNS 서버 IP 주소
    * Lease Time(DHCP 서버가 할당(임대) 해 준 IP 주소를 단말이 사용할 수 있는 기간)
  * DNSP 서버가 DHCP Ack 메시지를 브로드캐스팅

#### 단말이 DHCP Request를 브로드캐스팅으로 보내는 이유
* 동일 서브넷에서 DHCP Discover 메시지를 받은 모든 DHCP 서버가 DHCP Offer를 브로드캐스팅으로 보냄
* 이때 각 DHCP 서버는 단말에 부여할 네트워크 정보를 생성하고 저장함
* 단말은 DHCP Offer 중 하나만을 선택함
* 단말이 보낸 DHCP Request를 모든 DHCP 서버에 보내서 선택되지 않은 DHCP 서버는 저장한 네트워크 정보를 삭제할 수 있게 함 

### DHCP 서버가 DHCP Ack를 브로드캐스팅으로 보내는 이유
* 아직 단말의 네트워크 정보가 등록되지 않았기 때문(아직 메시지를 받는 대상이 특정되지 않음)

### 2. IP 주소 임대기간 연장 절차
1. DHCP Request
  * 단말 => DHCP 서버
  * Client IP Address(ciaddr) 필드에 임대기간 연장을 요청하는 단말 IP 주소를 넣어 보냄
  * IP주소를 쌍방으로 알고 있으므로 유니캐스팅
2. DHCP Ack
  * 단말 <= DHCP 서버
  * 단말이 사용할 네트워크 정보를 담아서 보냄
  * IP주소를 쌍방으로 알고 있으므로 유니캐스팅

### 3. IP 주소 반납 절차
1. DHCP Release
  * 단말 => DHCP 서버
  * 단말이 메시지를 DHCP 서버에 유니캐스팅
  * 메시지를 받은 DHCP 서버는 저장하고 있던 해당 단말의 네트워크 정보를 해제