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

function stackedBarGraph(data, {
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // given d in data, returns the title text
  marginTop = mt, // top margin, in pixels
  marginRight = mr, // right margin, in pixels
  marginBottom = mb, // bottom margin, in pixels
  marginLeft = ml, // left margin, in pixels
  width = width, // outer width, in pixels
  height = height, // outer height, in pixels
  xDomain, // array of x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  xPadding = 0.3, // amount of x-range to reserve to separate bars
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  zDomain, // array of z-values
  offset = d3.stackOffsetDiverging, // stack offset method
  order = d3.stackOrderNone, // stack order method
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors = d3.schemeTableau10, // array of colors
  graphTag,
  sampleCountTag
} = {}) {
  // 기존에 그려진 그래프 삭제 - 콤보 박스 값을 바꿀 때 새 그래프를 추가하기 전에 기존 그래프를 지우기 위함
  d3.select(`div${graphTag}`).selectAll("svg").remove();

  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  // Compute default x- and z-domains, and unique them.
  if (xDomain === undefined) xDomain = X;
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the x- and z-domains.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));
  console.log("I: ", I);
  // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
  // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
  // each tuple has an i (index) property so that we can refer back to the
  // original data point (data[i]). This code assumes that there is only one
  // data point for a given unique x- and z-value.
  console.log("data : ", data);

  const series = d3.stack()
      .keys(zDomain)
      .value(([x, I], z) => Y[I.get(z)])
      .order(order)
      .offset(offset)
    (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3.select(graphTag)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("transform", `translate(${ml},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
      .attr("x2", width - ml - mr)
      .attr("stroke-opacity", 0.1))
    // .call(g => g.append("text")
    //   .attr("x", -ml)
    //   .attr("y", 10)
    //   .attr("fill", "currentColor")
    //   .attr("text-anchor", "start")
    //   .text(yLabel));

  console.log("series: ", series);
  const bar = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", ([{i}]) => color(Z[i]))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", ({i}) => xScale(X[i]))
      .attr("y", ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
      .attr("height", ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
      .attr("width", xScale.bandwidth());
  
  if (title) bar.append("title")
    .text(({i}) => title(i));

  svg.append("g")
    .attr("transform", `translate(0,${yScale(0)})`)
      .call(xAxis);
  
      data.sort((a,b) => {
        return d3.descending(a.domain, b.domain);
      });

  // Draw legend
  let legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

  legend.append("rect")
    .attr("x", graphWidth + 80)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});

  legend.append("text")
    .attr("x", graphWidth + 105)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) { 
      switch (i) {
        case 0: return "<10";
        case 1: return "10-19";
        case 2: return "20-29";
        case 3: return "30-39";
        case 4: return "40-49";
        case 5: return "50-59";
        case 6: return "60-69";
        case 7: return ">=70";
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
    stateages = ages.flatMap(age => hourCount.map(d => ({domain: d.domain, age, count: d[age]})));
    console.log('stateages :', stateages);

    // stackedBarGraph('.hourlyAgeUsageGraph', 'hourlyAgeUsageSummary', hourCount, age);
    // drawGraph('.hourlyAgeUsageGraph', 'hourlyAgeUsageSummary', hourCount);
    chart = stackedBarGraph(stateages, {
      x: d => d.domain,
      y: d => d.count,
      z: d => d.age,
      xDomain: d3.groupSort(stateages, D => d3.sum(D, d => -d.count), d => d.domain),
      yLabel: "↑ 연령대",
      zDomain: ages,
      colors: d3.schemeSpectral[ages.length],
      width,
      height,
      graphTag: '.hourlyAgeUsageGraph',
      sampleCountTag: 'hourlyAgeUsageSummary'
    });
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