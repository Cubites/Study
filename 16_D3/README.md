# D3.js
* 데이터를 시각적으로 표현할 때 사용하는 패키지
* 막대그래프, 원형그래프부터 지도까지 다양한 것들 표현 가능

## D3 함수
### create() 와 append()의 차이점
* create()는 DOM 요소를 선택하지 않아도 요소를 생성할 수 있음
  ```javascript
    d3.create("g")
      .attr( ... )
  ```
* append()는 DOM 요소를 선택하고 사용해야하며, 생성과 해당 DOM요소에 추가하는 과정을 한번에 실행함
  ```javascript
    d3.select("svg")
      .append("g")
      .attr( ... )
  ```
* 결론
  * create()는 Dom 요소에 바로 적용하지 않고 선택자로 생성해 놓을 때 사용함
  * append()는 Dom 요소에 즉시 적용할 때 사용함
  * 일반적으로 append()를 많이 사용함

### min, max, extent
* d3.min
  * 입력한 배열 값 중, 최솟값을 반환
  * 날짜는 가장 과거의 값을 반환
  * Math.min()과 달리 NaN, Null, undefined는 무시
  * 비교 불가능한 값만 있는 경우 undefined 반환
  ```javascript
    d3.min([2, 4, 6, 8, 10]); // >> 2
    d3.min([Date(2020, 9, 30), Date(2022, 10, 10)]) // >> 2022-10-10
    d3.min([1, 2, 3, NaN, null, undefined]) // >> 1
    d3.min([]) // >> undefined
  ```
* d3.max
  * 입력한 배열 값 중, 최댓값을 반환
  * 날짜는 가장 최근 시간을 반환
  ```javascript
    d3.max([2, 4, 6, 8, 10]);
    >> 10

    d3.extent([2, 4, 6, 8, 10]);
    >> [2, 10]
    
    d3.minIndex([2, 4, 6, 8, 10]);
    >> 0

    d3.maxIndex([2, 4, 6, 8, 10]);
    >> 4
  ```

### rect
* 사각형을 그리는 태그
* 이 태그 안에 text, tspan같은 태그를 넣으면 전부 무시됨
  * 때문에 글자를 넣으려면 rect 태그 밖에 추가해야 함
* rect 태그 속성
  ```html
    <rect
      x="x축 방향 좌표" y="y축 방향 좌표"
      width="사각형 너비" height="사각형 높이"
      fill="사각형 색상"
    ></rect>
  ```

### append, join
* 요소를 추가하는 기능
* 한번에 여러 개를 추가하고 싶은 경우, 앞에 ".data()"로 데이터를 지정하면 됨
  * 예
    ```javascript
      const data = [1, 2, 3, 4, 5];

      d3.select('body') // 위치 지정(body 태그)
        .append('svg') // 선택한 태그 안에 svg 태그 생성
        .selectAll('text')
        .data(data)
        .join('text')
          .text(d => d);
    ```
### d3.attr('class', '클래스명')
* class를 추가함
* 기존의 class 값을 덮어 씌움
* 기존 값에 추가를 원한다면 <code>d3.classed('클래스명', true)</code>를 사용할 것

### Map & InternMap
* Map: key-value 쌍의 집합인 Javascript 표준 내장 객체
* InternMap
  * Map처럼 key-value 쌍의 집합으로 이루어진 객체
  * Map과 달리 Date 객체도 key로 사용할 수 있음
* 사용 예
  ```javascript
    let internmap = d3.InternMap([['a', 1], ['b', 2]]);
    internmap.set('c', 3); // 추가
    internmap.get('a'); // key로 value 조회
  ```

### d3.rollup(Iterable, reduce, key1[, key2[, key3]])
* Iterable: 연산에 사용할 배열
* 예
  ```javascript

  ```


## 그래프(Chart)
* 예시 파일: totalgraph(d3 v7 기준)
  * 사용법
    ```javascript
      MakeGraph(GraphData, 'grouped-bar', { // 데이터, 그래프 종류('bar', 'circle', 'grouped-bar', 'horizontal-stacked-bar')
        Title, // 그래프 제목
        GraphTag, // 그래프를 넣을 태그의 Class name

        Domain, // 축 도메인
        AddDomainText, // 도메인에 덧붙여 표시할 텍스트
        DomainIndex, // 데이터에서 도메인 값의 Index

        Legend, // 축 서브 도메인(사용: Stacked bar chart, Grouped bar chart)
        AddLegendText, // 서브 도메인에 덧붙여 표시할 텍스트
        LegendIndex, // 데이터에서 서브 도메인 값의 Index

        FilterLegend, // 필터링할 데이터(예: ['남', '여'] ; 남, 여 중 하나를 필터릴 할 예정)
        FilterLegendIndex, // 데이터에서 필터링할 값의 Index
        FilterValue, // filterLegend 중 필터링할 값(예: '남' ; 남 인 데이터를 제외)

        OuterWidth = document.querySelector(`.${GraphTag}`).offsetWidth, // 그래프 영역 너비(Margin 포함)
        OuterHeight = document.querySelector(`.${GraphTag}`).offsetHeight, // 그래프 영역 높이(Margin 포함)
        Margin = {top: 0.2, bottom: 0.2, left: 0.2, right: 0.2}, // 그래프 Margin(<1: 비율, 1<: 픽셀)
        XPadding = 0.3, // 축 막대 사이 간격
        ZPadding = 0.05, // 막대 묶음 사이 간격
        DomainEqualValue = false, // 도메인과 데이터 값이 같은지 여부
        LegendEqualValue = false, // 서브 도메인과 데이터 값이 같은지 여부
        Colors = d3.schemeCategory10 // 막대 색상(넣은 순서대로 적용)
      });
    ```