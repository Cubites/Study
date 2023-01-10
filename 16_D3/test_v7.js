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

/***********************************
  drawStackedBarGraph : 누적 막대 그래프 그리는 함수
  **********************************
  - graphTab : 그래프를 넣을 태그 class (예: ".graph") 
  - sampleCountTag : 데이터 표본 수를 넣을 태그 (예: ".sample")
  - data : 표에 사용할 데이터. domain은 x축에 표시할 텍스트, 나머지는 y축 데이터 값(하단에 데이터 예시)
    <데이터 예시 - 지역별 연령대 인구수>
    [
      {domain: "서울", age: '<10', count: 53233},
      {domain: "서울", age: '10-19', count: 83414},
      {domain: "서울", age: '20-29', count: 104253},
      ...
      {domain: "부산", age: '<10', count: 24559},
      {domain: "부산", age: '10-19', count: 58394},
      {domain: "부산", age: '20-29', count: 74142},
      ...
    ]
*/
function drawStackedBarGraph(data, {
  x = (d, i) => i, // 데이터를 넣으면 x값(순서 값) 반환
  y = d => d, // 데이터를 넣으면 y값(양) 반환
  z = () => 1, // 데이터를 넣으면 z값(범주) 반환
  title, // given d in data, returns the title text (확인 필요)
  marginTop = mt, // 위 여백 크기
  marginRight = mr, // 오른쪽 여백 크기
  marginBottom = mb, // 아래 여백 크기
  marginLeft = ml, // 왼쪽 여백 크기
  width = width, // 그래프 영역 너비(여백 포함)
  height = height, // 그래프 영역 높이(여백 포함)
  xDomain, // x축 값 배열
  xRange = [marginLeft, width - marginRight], // x축 범위[왼쪽 끝 값, 오른쪽 끝 값]
  xPadding = 0.3, // 막대 사이 간격(비율)
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [y축 최소값, y축 최대값]
  yRange = [height - marginBottom, marginTop], // y축 범위 [아래 끝 값, 위 끝 값]
  zDomain, // z축 값 배열
  offset = d3.stackOffsetDiverging, // 오프셋 규칙(기준선 규칙)(예: y=0 기준 선을 위로 10만큼 이동)
  order = d3.stackOrderNone, // 누적 순서 규칙(stackOrderNone: 들어온 데이터 순서 그대로 적용)
  yFormat, // y축 형식 지정 문자열
  colors = d3.schemeTableau10, // z축 데이터 막대에 넣을 색상 배열
  graphTag, // 그래프를 넣을 태그의 class 혹은 id 값
  sampleCountTag // 그래프에 사용한 데이터 표본 수를 입력할 태그의 class 값
} = {}) {
  // 기존에 그려진 그래프 삭제 - 콤보 박스 값을 바꿀 때 새 그래프를 추가하기 전에 기존 그래프를 지우기 위함
  d3.select(`div${graphTag}`).selectAll("svg").remove();

  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);
  
  // x축 도메인, z축 도메인(stack 도메인) 중복 제거(Set 타입으로 변환)
  if (xDomain === undefined) xDomain = X;
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  // x, z축 도메인에 없는 데이터 생략
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // stack 그래프를 그리기 위해 데이터 변환
  const series = d3.stack()
      .keys(zDomain)
      .value(([x, I], z) => Y[I.get(z)])
      .order(order)
      .offset(offset)
    (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
      .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

  // y축 도메인 기본 값 계산. (주의: diverging stack(예: 좌우로 퍼지는 그래프)은 값이 음수로 나올 수도 있음)
  if (yDomain === undefined) yDomain = d3.extent(series.flat(2));
  
  // 크기, 축, 형식 구성
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles. (확인 필요)
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  // 그래프 영역 지정
  const svg = d3.select(graphTag)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // y축 그리기 + 막대 영역의 가로선
  svg.append("g")
    .attr("transform", `translate(${ml},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
      .attr("x2", width - ml - mr)
      .attr("stroke-opacity", 0.1))

  // 막대 그리기
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

  // x축 그리기
  svg.append("g")
    .attr("transform", `translate(0,${yScale(0)})`)
      .call(xAxis);

  // 범례 그리기
  let legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(30,${i * 19})`);

  legend.append("rect")
    .attr("x", graphWidth + 80)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", (d, i) => colors.slice().reverse()[i]);

  legend.append("text")
    .attr("x", graphWidth + 105)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text((d, i) => {
      switch (i) {
        case 7: return "<10";
        case 6: return "10-19";
        case 5: return "20-29";
        case 4: return "30-39";
        case 3: return "40-49";
        case 2: return "50-59";
        case 1: return "60-69";
        case 0: return ">=70";
      }
    });

  // 툴팁(그래프에 마우스 올리면 나오는 창) 구성
  let tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
    
  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  console.log(series);
  tooltip.append("text")
    .attr("x", 20)
    .attr("dy", "1.5em")
    .style("text-anchor", "middle")
    .attr("font-size", "15px")
    .attr("font-weight", "bold");
  
  // 데이터 표본 수 입력
  let sampleCount = document.getElementsByClassName(sampleCountTag)[0];
  sampleCount.innerText = `데이터 표본 수: ${data.length == undefined ? 0 : data.map(d => d.count).reduce((a, b) => a + b)} 개`;
}

async function createTermTable(term, num){
  await fetch('http://localhost:5502/16_D3/test.json')
  .then((response) => response.json())
  .then((data) => {
    /* 시간대별, 요일별 학습 그래프 (hourly, weekly Use) (연령대 포함) */
    let now = new Date();
    let ages = ['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '>=70'];
    
    /** 요일별 이용 횟수 그래프 **/
    let weekCount = Array();
    let weeks = ["일", "월", "화", "수", "목", "금", "토"];

    for(let i = 0; i < 24; i++){
      weekCount.push({domain: weeks[i], '<10': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '>=70': 0, count: 0});
    }
    for(let d of data){
      let birthday = new Date(d.birthDate);
      let dtc = new Date(d.createdAt);
      let userAge = parseInt((now.getFullYear() - birthday.getFullYear()) / 10);
      if(userAge >= 7){
        weekCount[dtc.getDay()]['>=70'] += 1;
        weekCount[dtc.getDay()].count += 1
      }else{
        weekCount[dtc.getDay()][ages[userAge]] += 1;
        weekCount[dtc.getDay()].count += 1
      }
    }
    for(let i of data){
      let dtc = new Date(i.createdAt);
      weekCount[dtc.getDay()].count += 1;
    }

    // drawGraph('.weeklyAgeUsageGraph', 'weeklyAgeUsageSummary', weekCount);
    let weekAges = ages.flatMap(age => weekCount.map(d => ({domain: d.domain, age, count: d[age]})));
    console.log(weekAges);
    drawStackedBarGraph(weekAges, {
      x: d => d.domain,
      y: d => d.count,
      z: d => d.age,
      xDomain: weeks, // x축 도메인(요일 - 일 ~ 토)
      zDomain: ages, // z축 도메인(나이대)
      colors: d3.schemeSpectral[ages.length], // z축 도메인 별 색상
      width, // 그래프 영역 너비(여백 포함)
      height, // 그래프 영역 높이(여백 포함)
      graphTag: '.weeklyAgeUsageGraph', // 그래프 태그(<svg>)가 들어갈 태그의 class 명(#이름 이라 적으면 id 적용 가능)
      sampleCountTag: 'weeklyAgeUsageSummary' // 그래프 표본 수가 들어갈 태그의 class 명("." 제외)
    });

    /** 시간대별 이용 횟수 그래프 **/
    let hourCount = Array();

    for(let i = 0; i < 24; i++){
      hourCount.push({domain: i, '<10': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '>=70': 0, count: 0});
    }
    
    for(let d of data){
      let birthday = new Date(d.birthDate);
      let dtc = new Date(d.createdAt);
      let userAge = parseInt((now.getFullYear() - birthday.getFullYear()) / 10);
      if(userAge >= 7){
        hourCount[dtc.getHours()]['>=70'] += 1;
        hourCount[dtc.getHours()].count += 1
      }else{
        hourCount[dtc.getHours()][ages[userAge]] += 1;
        hourCount[dtc.getHours()].count += 1
      }
    }
    /*
      hourCount 예시
      [
        {domain: i, '<10': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '>=70': 0, count: 0},
        {domain: i, '<10': 0, '10-19': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '>=70': 0, count: 0},
        ...
      ]
      * count 는 세로 막대 하나 전체의 누적값
      
      age 예시
      let ages = ['<10', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '>=70'];
    */

    let stateages = ages.flatMap(age => hourCount.map(d => ({domain: d.domain, age, count: d[age]})));
    
    drawStackedBarGraph(stateages, {
      x: d => d.domain,
      y: d => d.count,
      z: d => d.age,
      xDomain: d3.groupSort(stateages, d => d, d => d.domain), // x축 도메인(시간대)
      zDomain: ages, // z축 도메인(나이대)
      colors: d3.schemeSpectral[ages.length], // z축 도메인 별 색상
      width, // 그래프 영역 너비(여백 포함)
      height, // 그래프 영역 높이(여백 포함)
      graphTag: '.hourlyAgeUsageGraph', // 그래프 태그(<svg>)가 들어갈 태그의 class 명(#이름 이라 적으면 id 적용 가능)
      sampleCountTag: 'hourlyAgeUsageSummary' // 그래프 표본 수가 들어갈 태그의 class 명("." 제외)
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