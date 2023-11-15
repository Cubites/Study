# NodeJS
## 파일 관리 기술
### 노드의 파일 시스템
* https://nodejs.org/api/fs.html 참고
* 동기식 IO와 비동기식 IO 모두 제공
* 동기식 IO는 파일 작업이 끝날 때까지 대기함
* 비동기식 IO는 파일 작업과 동시에 하위에 있는 다른 작업들이 이루어 짐
  | 메소드 이름 | 설명 |
  | --- | --- |
  | readFile(filename, [encoding], [callback]) | 비동기식 IO로 파일을 읽음 |
  | readFileSync(filename, [encoding]) | 동기식 IO로 파일을 읽음 |
  | writeFile(filename, data, encoding='utf8', [callback]) | 비동기식 IO로 파일을 씀 |
  | writeFileSync(filename, data, encoding='utf8') | 동기식 IO로 파일을 읽음 |
  * encoding 값을 적지 않으면 바이너리 값으로 처리 됨
* IO 과정
  1. 파일을 열음 (파일 존재 유무 확인)
  2. 파일을 읽음 (or 씀)
  3. 파일을 닫음
* 파일 open, read, write, close method
  | 메소드 이름 | 설명 |
  | --- | --- |
  | open(path, flags [, mode] [, callback]) | 파일을 열음 |
  | read(fd, buffer, offset, length, position [, callback]) | 지정한 부분의 파일 내용을 읽음 |
  | write(fd, buffer, offset, length, position [, callback]) | 파일의 지정 부분에 데이터를 씀 |
  | close(fd, callback) | 파일을 닫음 |
* 디렉토리
  | 메소드 이름 | 설명 |
  | --- | --- |
  | fs.mkdir(디렉토리명, callback)<br>fs.mkdirSync(디렉토리명) | 디렉토리 생성 |
  | fs.rmdir(디렉토리명, callback)<br>fs.rmdirSync(디렉토리명) | 디렉토리 삭제 |
  | fs.exists(디렉토리명, callback)<br>fs.existsSync(디렉토리명) | 디렉토리 존재여부 확인 |

* flag
  | 코드 | 설명 |
  | --- | --- |
  | r | 읽기로 열기. 파일이 존재하지 않으면 에러발생. |
  | r+ | 읽기/쓰기로 열기. 파일이 존재하지 않으면 에러발생. |
  | w | 쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 지우고 처음부터 씀. |
  | w+ | 읽기/쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 처음부터 씀. |
  | a | 추가 쓰기로 열기. 파일이 존재하지 않으면 만들어짐. |
  | a+ | 파일을 읽고/추가쓰기모드로 열기. 파일이 존재하지 않으면 만들어짐. |

### Buffer
* 컴퓨터가 읽을 수 있는 형태(바이너리 데이터)로 만든 데이터(예 : 01000110110)
* string과 다르므로 string 처럼 사용하려면 string으로 변환해서 사용해야 함
* 한 버퍼의 값을 다른버퍼로 copy하는 경우
  <br>> 버퍼의 크기가 같아야 copy됨, 다르면 copy되지 않음
* buffer 생성 방법
  | 코드 | 설명 |
  | --- | --- |
  | <code>Buffer.from()</code> | () 안의 값을 버퍼 객체로 만듬, 다른 버퍼를 넣으면 해당 버퍼를 복제하여 버퍼를 생성 |
  | <code>Buffer.alloc()</code> | () 안의 숫자 크기의 빈 버퍼를 생성 |
  | <code>Buffer.allocUnsafe()</code> | 버퍼는 기본적으로 내용을 검사하고 빈자리에 0을 채움<br>이 메소드는 0을 채우는 작업을 스킵함 |

### 스트림 단위로 파일 읽고 쓰기
* createReadStream, createWriteStream
  > <pre>
  > let inFile = fs.createReadStream('파일이름', {flags: 'r'});
  > let outFile = fs.createWriteStream('파일이름', {flags: 'w'});

<!-- ## Log 남기기 -->