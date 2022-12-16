# 막대 그래프

## 그리는 과정
* 영역 지정
* x, y 축 간격 지정
* 그래프 막대 생성
* x축, y축 눈금 표시
* 그외, 다양한 것들이 가능

## 예시
```javascript
const width = window.outerWidth / 2; // 그래프 너비
const height = 500; // 그래프 높이
let [mt, mb, mr, ml] = [50, 50, 100, 100]; // 그래프 여백(위, 아래, 오른쪽, 왼쪽)

// 그래프 크기(여백 제외)
const graphWidth = width - ml - mr;
const graphHeight = height - mt - mb;

// 그래프 색
const graphColor = 'skyblue';

// 그래프 구역 생성(<svg></svg> 태그 생성)
const svg = d3
    .select(graphTag) 
    // graphTag : id 혹은 class 값. 그래프 영역인 svg 태크가 들어갈 위치
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 그래프 실제 영역 지정(모서리 여백 제외)
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${ml}, ${mt})`);

// 그래프 위치를 중앙으로 이동
const xAxisG = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
const yAxisG = graph.append('g');

/*
    data : 표에 사용할 데이터 (하단에 데이터 예시)
        [
            {domain: "0시", value: 15},
            {domain: "1시", value: 4},
            ...
        ]
*/

// x축 간격 지정 함수
const x = d3.scaleBand()
    .domain(data.map(d => d.domain))
    .range([0, graphWidth])
    .padding(0.3); // 축 사이 간격 비율(막대 가로 두께가 변함)

// y 축 간격 지정 함수
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([graphHeight, 0]);

// 막대 그래프 생성
const bars = graph.selectAll('rect')
    .data(data);

// 각 막대의 x축 위치, y축 높이, 모양, 색상 지정
bars.enter()
    .append('rect')
    .attr('height', d => graphHeight - y(d.value))
    .attr('width', x.bandwidth)
    .attr('fill', graphColor)
    .attr('x', d => x(d.domain))
    .attr('y', d => y(d.value));

// 막대 위에 값 출력
bars.enter()
    .append('text')
    .attr('x', d => {
        return x(d.domain)
    })
    .attr('y', d => y(d.value) - 5)
    .text(d => `${d.value}`)
    .attr('text-anchor', 'start');

// x축 눈금과 y축 눈금 표시 방향 지정
const xAxis = d3.axisBottom(x); // 축 아래로 생성 <=> axisTop
const yAxis = d3.axisLeft(y); // 축 왼쪽으로 생성 <=> axisRight

xAxisG.call(xAxis);
yAxisG.call(yAxis);
```