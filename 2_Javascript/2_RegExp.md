# 정규표현식
### 예
> <pre>
> == 정규표현식 리터럴 ==
> let pattern = /a/;
>
> == 정규표현식 객체 생성자 ==
> let pattern2 = new RegExp('a');
> <pre>

## 기능
### RegExp.exec('문자열')
: '문자열' 내에서 RegExp에 들어있는 정규표현식에 맞는 내용 출력
#### 예
> <pre>
> let pattern = /a/;
> pattern.exec('abcde'); // ['a'] 출력
> </pre>
* 적합한 문자가 없으면 null 반환

### RegExp.test('문자열')
* '문자열' 내에 RegExp에 들은 정규표현식에 맞는 내용이 있으면 true, 없으면 false 반환

### String.match(RegExp)

### String.replace(RegExp, replace_text)

## 옵션
### i 옵션
* 대소문자를 구분하지 않는 옵션
* 예
  > <pre>
  > let pattern = /a/i
  > </pre>

### g 옵션
* 검색된 모든 결과를 리턴, i와 같은 위치에 사용