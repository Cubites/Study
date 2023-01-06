/* 공통 옵션 */
const width = window.outerWidth * 0.7 / 2; // 그래프 너비
const height = 400; // 그래프 높이
let [mt, mb, mr, ml] = [50, 50, 100, 100]; // 그래프 여백(위, 아래, 오른쪽, 왼쪽)

// 그래프 크기(여백 제외)
const graphWidth = width - ml - mr;
const graphHeight = height - mt - mb;

// 그래프 색
const graphColor = 'skyblue';

const config = {
  method: "get"
};

/***********************************
  drawGraph : 막대 그래프 그리는 함수
  **********************************
  - graphTab : 그래프를 넣을 태그 class (예: ".graph") 
  - sampleCountTag : 데이터 표본 수를 넣을 태그 (예: ".sample")
  - data : 표에 사용할 데이터. domain은 축에 표시할 텍스트, count는 데이터 값(하단에 데이터 예시)
    [
      {domain: "0시", count: 15},
      {domain: "1시", count: 4},
      ...
    ]
*/
const drawGraph = (graphTag, sampleCountTag, data) => {
  // 기존에 그려진 그래프 삭제 - 콤보 박스 값을 바꿀 때 새 그래프를 추가하기 전에 기존 그래프를 지우기 위함
  let removeSvg = d3.select(`div${graphTag}`).selectAll("svg").remove();

  // 그래프 구역 생성(<svg></svg>)
  const svg = d3
    .select(graphTag)
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

  // x축 간격 지정 함수
  const x = d3.scaleBand()
    .domain(data.map(d => d.domain))
    .range([0, graphWidth])
    .padding(0.3) // 축 사이 간격 비율(막대 가로 두께가 변함)

  // y 축 간격 지정 함수
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([graphHeight, 0]);

  // 막대 그래프 생성
  const bars = graph.selectAll('rect')
    .data(data);
  
  // 각 막대의 x축 위치, y축 높이, 모양 지정
  bars.enter()
    .append('rect')
    .attr('height', d => graphHeight - y(d.count))
    .attr('width', x.bandwidth)
    .attr('fill', graphColor)
    .attr('x', d => x(d.domain))
    .attr('y', d => y(d.count));

  // 막대 위에 값 출력
  bars.enter()
    .append('text')
    .attr('x', d => x(d.domain))
    .attr('y', d => y(d.count) - 5)
    .text(d => d.count !== 0 ? `${d.count}` : '')
    .attr('text-anchor', 'start');
  
  // x축 눈금과 y축 눈금 표시 방향 지정
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  let sampleCount = document.getElementsByClassName(sampleCountTag)[0];
  sampleCount.innerText = `데이터 표본 수: ${data.length == undefined ? 0 : data.map(d => d.count).reduce((a, b) => a + b)} 개`;
}

const stackedBarGraph = (graphTag, sampleCountTag, data, stackLayer) => {
  console.log(data);
  // 기존에 그려진 그래프 삭제 - 콤보 박스 값을 바꿀 때 새 그래프를 추가하기 전에 기존 그래프를 지우기 위함
  let removeSvg = d3.select(`div${graphTag}`).selectAll("svg").remove();

  // 그래프 구역 생성(<svg></svg>)
  const svg = d3
    .select(graphTag)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    // 그래프 실제 영역 지정(모서리 여백 제외)
    .append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${ml}, ${mt})`);
  
  let parse = d3.timeFormat("%Y").parse;

  let dataset = d3.stack(stackLayer.map((age) => {
    return data.map(d => {
      return {x: d.domain, y: +d[age]};
    });
  }));

  // x축 간격 지정 함수
  const x = d3.scaleOrdinal()
    .domain(dataset[0].map(d => d.domain))
    .rangeRoundBands([10, graphWidth-10], 0.02);

  // y 축 간격 지정 함수
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([graphHeight, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));
  
  let colors = d3.schemeTableau10;
  let color = d3.scaleOrdinal()
    .domain(stackLayer)
    .range(colors);

  let stackedData = d3.stack()
    .keys(stackLayer)(data)

  // Show the bars
  svg.append("g")
  .selectAll("g")
  // Enter in the stack data = loop key per key = group per group
  .data(data)
  .enter().append("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.group); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width",x.bandwidth())

  let sampleCount = document.getElementsByClassName(sampleCountTag)[0];
  sampleCount.innerText = `데이터 표본 수: ${data.length == undefined ? 0 : data.map(d => d.count).reduce((a, b) => a + b)} 개`;
}

async function createTermTable(term, num){
  // await fetch("---", {
  //   method: "POST",
  //   headers: {
  //     "content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     term: term,
  //     num: num
  //   })
  // })
  await fetch('./test.json')
  .then((response) => response.json())
  .then((data) => {
    /* 시간대별, 요일별 학습 그래프 (hourly, weekly Use) (연령대 포함) */

    /** 시간대별 이용 횟수 그래프 **/
    let hourCount = Array();
    
    let age = ['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '>=70'];
    let now = new Date();

    for(let i = 0; i < 24; i++){
      hourCount.push({domain: i, '<10': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '>=70': 0, count: 0});
    }
    
    for(let d of data){
      let birthday = new Date(d.birthDate);
      let dtc = new Date(d.createdAt);
      let userAge = parseInt((now.getFullYear() - birthday.getFullYear()) / 10);
      if(userAge >= 70){
        hourCount[dtc.getHours()]['>=70'] += 1;
        hourCount[dtc.getHours()].count += 1
      }else{
        hourCount[dtc.getHours()][age[userAge]] += 1;
        hourCount[dtc.getHours()].count += 1
      }
    }

    stackedBarGraph('.hourlyAgeUsageGraph', 'hourlyAgeUsageSummary', hourCount, age);
    // drawGraph('.hourlyAgeUsageGraph', 'hourlyAgeUsageSummary', hourCount);

    /** 요일별 이용 횟수 그래프 **/
    let weekCount = [
      {domain: "일", count: 0}, 
      {domain: "월", count: 0}, 
      {domain: "화", count: 0}, 
      {domain: "수", count: 0}, 
      {domain: "목", count: 0}, 
      {domain: "금", count: 0}, 
      {domain: "토", count: 0}
    ];
    
    for(let i of data){
      let dtc = new Date(i.createdAt);
      weekCount[dtc.getDay()].count += 1;
    }

    drawGraph('.weeklyAgeUsageGraph', 'weeklyAgeUsageSummary', weekCount);
  });
};

// 페이지가 로딩될때 실행
window.onload = async function () {
  const defaultValue = document.getElementsByTagName('select')[0].value;
  createTermTable(defaultValue.slice(1, defaultValue.length), defaultValue[0]);
};

// 콤보 박스의 값이 바뀔 때마다 실행 => 그래프가 새로 그려짐
const handleOnChange = (e) => {
  createTermTable(e.value.slice(1, e.value.length), e.value[0]);
}