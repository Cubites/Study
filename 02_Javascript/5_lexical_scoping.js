let word = 'first';
function log(){
    console.log(word);
}
function wrapper(){
    word = 'second'; // 전역변수 word의 값을 'second'로 변경
    log();
}
wrapper();
/*
    1. 함수 log() 선언 시, 가장 가까운 전역변수 word를 참조
    2. 함수 wrapper() 실행 시, 전역변수 word의 값을 'second'로 변경
    3. 함수 log()는 전역변수 word를 참조하고 있으므로 'second'를 출력
*/

let word2 = 'first';
function log2(){
    console.log(word2);
}
function wrapper2(){
    let word2 = 'second'; // 지역변수 word2 생성
    log2();
}
wrapper2();
/*
    1. 함수 log2() 선언 시, 가장 가까운 전역변수 word를 참조
    2. 함수 wrapper() 실행 시, "지역변수" word2 선언
    3. 하지만 log2()는 "전역변수" word2를 참조하고 있기 때문에 'first' 출력
*/

function outer() {
    let word3 = "text";
    console.log('외부함수 실행 체크');
    function inner() {
        console.log(word3);
    }
    return inner;
}
let outerFunc = outer();
outerFunc();