/* 공통 옵션 */
const width = window.outerWidth * 0.75 / 2; // 그래프 너비
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
  const x = d3.scale.ordinal()
    .domain(d => d.map(d => d.domain))
    .rangeBands([0, graphWidth], 0.3);

  // y 축 간격 지정 함수
  const y = d3.scale.linear()
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
  const xAxis = d3.svg
    .axis()
    .scale(x)
    .orient("bottom");

  const yAxis = d3.svg
    .axis()
    .scale(y)
    .orient("left");
  
  xAxisG.call(xAxis)
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'black'
    });
  yAxisG.call(yAxis)
    .attr({
      fill: 'none',
      'stroke-width': 1,
      stroke: 'black'
    });

  let sampleCount = document.getElementsByClassName(sampleCountTag)[0];
  sampleCount.innerText = `데이터 표본 수: ${data.length == undefined ? 0 : data.map(d => d.count).reduce((a, b) => a + b)} 개`;
}

const stackedBarGraph = (graphTag, sampleCountTag, data, stackLayer) => {
  // 기존에 그려진 그래프 삭제 - 콤보 박스 값을 바꿀 때 새 그래프를 추가하기 전에 기존 그래프를 지우기 위함
  d3.select(`div${graphTag}`).selectAll("svg").remove();

  // var margin = {top: 20, right: 160, bottom: 35, left: 30};

  // var width = 960 - margin.left - margin.right,
  //     height = 500 - margin.top - margin.bottom;

  let svg = d3
    .select(graphTag)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${ml}, ${mt})`);


  /* Data in strings like it would be if imported from a csv */

    // Transpose the data into layers
  let dataset = d3.layout.stack()(stackLayer.map((age) => {
    return data.map((d) => {
        return {x: parse(d.domain), y: +d[age]};
    });
  }));


  // Set x, y and colors
  let x = d3.scale.ordinal()
    .domain(dataset[0].map((d) => d.x))
    .rangeRoundBands([10, graphWidth-10], 0.02);

  let y = d3.scale.linear()
    .domain([0, d3.max(dataset, (d) => d3.max(d, (d) => d.y0 + d.y))])
    .range([height, 0]);

  let colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];


  // Define and draw axes
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y"));

  let yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-graphWidth, 0, 0)
    .tickFormat(d => d);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + graphHeight + ")")
    .call(xAxis);


    // Create groups for each series, rects for each segment 
  let groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", (d, i) => colors[i]);

  let rect = groups.selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", d => x(d.x))
    .attr("y", d => y(d.y0 + d.y))
    .attr("height", d => y(d.y0) - y(d.y0 + d.y))
    .attr("width", x.rangeBand())
    .on("mouseover", () => tooltip.style("display", null))
    .on("mouseout", () => tooltip.style("display", "none"))
    .on("mousemove", (d) => {
      let xPosition = d3.mouse(this)[0] - 15;
      let yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y);
    });


    // Draw legend
  let legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
    
  legend.append("rect")
    .attr("x", graphWidth - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});
    
  legend.append("text")
    .attr("x", graphWidth + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
        switch (i) {
        case 0: return "Anjou pears";
        case 1: return "Naval oranges";
        case 2: return "McIntosh apples";
        case 3: return "Red Delicious apples";
        }
    });


    // Prep the tooltip bits, initial display is hidden
  let tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
        
  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
  
  let sampleCount = document.getElementsByClassName(sampleCountTag)[0];
  sampleCount.innerText = `데이터 표본 수: ${data.length == undefined ? 0 : data.map(d => d.count).reduce((a, b) => a + b)} 개`;
}

async function createTermTable(term, num){
  await fetch('http://localhost:5502/16_D3/test.json')
  .then((response) => response.json())
  .then((data) => {
    console.log('data: ', data);
    /* 시간대별, 요일별 학습 그래프 (hourly, weekly Use) (연령대 포함) */
    
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
    console.log(weekCount);

    drawGraph('.weeklyAgeUsageGraph', 'weeklyAgeUsageSummary', weekCount);

    /** 시간대별 이용 횟수 그래프 **/
    let hourCount = Array();
    
    let ages = ['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '>=70'];
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
        hourCount[dtc.getHours()][ages[userAge]] += 1;
        hourCount[dtc.getHours()].count += 1
      }
    }

    stackedBarGraph('.hourlyAgeUsageGraph', 'hourlyAgeUsageSummary', hourCount, age);
    // drawGraph('.hourlyAgeUsageGraph', 'hourlyAgeUsageSummary', hourCount);
  });
}

// 페이지가 로딩될때 실행
window.onload = async function () {
  const defaultValue = document.getElementsByTagName('select')[0].value;
  createTermTable(defaultValue.slice(1, defaultValue.length), defaultValue[0]);
};

// 콤보 박스의 값이 바뀔 때마다 실행 => 그래프가 새로 그려짐
const handleOnChange = (e) => {
  createTermTable(e.value.slice(1, e.value.length), e.value[0]);
}