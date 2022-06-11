# Hook
* class형 component의  state을 function형 component에서도 사용할 수 있게 해줌
### useState
* 부모 component의 props로 전달한 state값을 자식 component에서 수정할 수 있게 해줌
* 사용 예
  > <pre>
  > const [num, setNum] = useState(0);
  > // 자식 component
  > setNum(1); // num 값이 1로 갱신됨
  > </pre>
* 앞의 값은 state 값, setNum은 state값을 갱신해주는 함수
* state 값이 바뀌면 component가 리렌더링 됨

### useRef

### useEffect

### useMemo
* Memoization을 위한 hook
  * memoization : 이전의 계산값을 메모리에 저장하여 동일한 계산 시 발생하는 불필요한 연산을 제거하여 속도를 향상시키는 기술
* component 최적화를 위한 대표적인 hook
