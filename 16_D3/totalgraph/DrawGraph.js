import * as d3 from 'd3';

function DrawBarGraph(GraphTag, ChartData, {
  Title,
  Domain,
  OuterWidth = document.querySelector(`.${GraphTag}`).offsetWidth, 
  OuterHeight = document.querySelector(`.${GraphTag}`).offsetHeight, 
  Margin = {top: 50, bottom: 100, left: 100, right: 100},
  Colors = d3.schemeCategory10
} = {}) {
  // 기존에 그려진 그래프 삭제 - 콤보 박스 값을 바꿀 때 새 그래프를 추가하기 전에 기존 그래프를 지우기 위함
  let removeSvg = d3.select(`div${GraphTag}`).selectAll("svg").remove();

  // 그래프 크기
  const GraphWidth = OuterWidth - Margin.left - Margin.right;
  const GraphHeight = OuterHeight - Margin.top - Margin.bottom;

  // 그래프 구역 생성(<svg></svg>)
  const svg = d3
    .select(`.${GraphTag}`)
    .append('svg')
    .attr('width', OuterWidth)
    .attr('height', OuterHeight);

  // 그래프 실제 영역 지정(모서리 여백 제외)
  const graph = svg.append('g')
    .attr('width', GraphWidth)
    .attr('height', GraphHeight)
    .attr('transform', `translate(${Margin.left}, ${Margin.top})`);

  // 그래프 위치를 중앙으로 이동
  const xAxisG = graph.append('g')
    .attr('transform', `translate(0, ${GraphHeight})`);
  const yAxisG = graph.append('g');

  // x축 간격 지정 함수
  const x = d3.scaleBand()
    .domain(ChartData.map(d => d.domain))
    .range([0, GraphWidth])
    .padding(0.3) // 축 사이 간격 비율(막대 가로 두께가 변함)

  // y 축 간격 지정 함수
  const y = d3.scaleLinear()
    .domain([0, d3.max(ChartData, d => d.count)])
    .range([GraphHeight, 0]);

  // 막대 그래프 생성
  const bars = graph.selectAll('rect')
    .data(ChartData);
  
  // 각 막대의 x축 위치, y축 높이, 모양 지정
  bars.enter()
    .append('rect')
    .attr('height', d => GraphHeight - y(d.count))
    .attr('width', x.bandwidth)
    .attr('fill', (d, i) => Colors[i])
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
  
  // 그래프에 제목 추가
  svg.append('text')
    .attr('x', OuterWidth / 2)
    .attr('y', Margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('text-size', '10px')
    .style('font-weight', 'bold')
    .text(Title);
}

function DrawCircleGraph(GraphTag, ChartData, {
  Title,
  Domain,
  OuterWidth = document.querySelector(`.${GraphTag}`).offsetWidth, 
  OuterHeight = document.querySelector(`.${GraphTag}`).offsetHeight, 
  Margin = {top: 50, bottom: 100, left: 100, right: 100},
  Colors = d3.schemeCategory10
} = {}) {
  // 기존에 그려진 그래프 삭제
  d3.select(`div.${GraphTag}`).selectAll("svg").remove();

  // 반지름
  const radius = Math.min(OuterWidth, OuterHeight) / 3.5;

  // 여백을 포함한 그래프 영역(<svg>) 추가    
  const svg = d3
    .select(`.${GraphTag}`)
    .append("svg")
    .attr("width", OuterWidth)
    .attr("height", OuterHeight)
    // .attr('text-anchor', 'middle')
    .style('font-size', '20px');

  // 여백을 제외한 실 그래프 영역(<g>) 추가
  const g = svg
    .append("g")
    .attr("transform", `translate(${OuterWidth / 2}, ${OuterHeight / 2})`);

  // 영역 색상 지정
  const ordScale = d3
    .scaleOrdinal()
    .domain(ChartData)
    .range(Colors);

  // 그래프 내경, 외경 설정
  const path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  // 영역 값 생성
  let pie = d3
    .pie()
    .value(d => d.count)
    .sort(null); // 정렬 안함

  let arc = g
    .selectAll("arc")
    .data(pie(ChartData))
    .enter();
  
  arc.append("path")
    .attr("d", path)
    .attr("file", d => ordScale(d.data.domain))
    .attr('d', path)
    .attr('fill', (d, i) => Colors[i])
    .attr('stroke', 'white');

  const arcs = pie(ChartData);

  const text = g.selectAll('text')
    .data(arcs)
    .enter()
    .append('text')
      .attr("transform", function(d) {  
        let a = path.centroid(d);
        return "translate(" + a[0]*2.5 +"," + a[1]*2.5 + ")";
      })
      .attr('dy', '0.35em');
  
  // 그래프에 제목 추가
  svg.append('text')
    .attr('x', OuterWidth / 2)
    .attr('y', Margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('text-size', '10px')
    .style('font-weight', 'bold')
    .text(Title);
  
  // 그래프 각 파이에 글자 넣기 - 데이터 값
  text.filter(d => (d.endAngle - d.startAngle > 0.25))
    .append('tspan')
    .attr('fill-opacity', 0.7)
    .attr("color", "#eeeeee")
    .attr('text-anchor', 'middle')
    // .text(d => d.data.count);
    .text(d => d.data.count !== 0 ? d.data.count : ''); // 데이터가 0이면 domain을 표시하지 않음

  // 범례 간격 계산
  let legendWidthLength = [0];
  for(let i = 0; i < Domain.length; i++){
    legendWidthLength.push(legendWidthLength[i] + Domain[i].length * 15 + 30);
  }

  // 그래프 하단에 범례 추가
  for(let i = 0; i < Domain.length; i++){
    svg.append("circle")
      .attr("cx", (OuterWidth - legendWidthLength[legendWidthLength.length - 1]) / 2 + legendWidthLength[i])
      .attr("cy", OuterHeight - Margin.bottom / 4)
      .attr("r", 6)
      .style("fill", Colors[i]);
    svg.append("text")
      .attr("x", (OuterWidth - legendWidthLength[legendWidthLength.length - 1]) / 2 + legendWidthLength[i] + 10)
      .attr("y", OuterHeight - Margin.bottom / 4 + 2)
      .text(Domain[i])
      .style("font-size", "15px")
      .attr("alignment-baseline","middle");
  }
}

/* 
  DrawGraph(GraphTag, ChartData, {OuterWidth,OuterHeight, Margin, XPadding, ZPadding});
  * 주의 사항: 그래프를 넣을 태그는 반드시 div로 할 것(다른 태그를 사용하려면 아래 코드 수정 필요)
  * 필수 매개변수
    - GraphTag: 그래프가 들어갈 태그의 class name
    - ChartData: 그래프로 표현할 데이터
      <데이터 구조 예시>
      const ChartData = [
        {domain: "A-city", legend: "<20", count: 14352},
        {domain: "A-city", legend: "20-50", count: 103242},
        {domain: "A-city", legend: ">50", count: 34352},
        {domain: "B-city", legend: "<10", count: 11534},
        {domain: "B-city", legend: "20-50", count: 133242},
        ...
      ]);
  * 선택 매개변수
    - OuterWidth: 그래프 구역 너비. 기본값은 GraphTag라는 class name을 가진 태그의 너비
    - OuterHeight: 그래프 구역 높이. 기본값은 GraphTag라는 class name을 가진 태그의 높이
    - Margin: 그래프 주변 4방향의 margin. 기본값은 {top: 50, bottom: 100, left: 100, right: 100}
      > 입력 예: const Margin: {top: 30, bottom: 30, left: 50, right: 50}
    - XPadding: 그래프 막대 사이의 간격 비율. 0 ~ 1 사이의 값을 넣어야 함(기본 값: 0.3)
    - ZPadding: Group 막대들 사이의 간격 비율. 0 ~ 1 사이의 값을 넣어야 함(기본 값: 0.05)
*/
function DrawGroupedGraph(GraphTag, ChartData, {
  Title,
  Domain,
  Legend,
  OuterWidth = document.querySelector(`.${GraphTag}`).offsetWidth, 
  OuterHeight = document.querySelector(`.${GraphTag}`).offsetHeight, 
  Margin = {top: 50, bottom: 100, left: 100, right: 100}, 
  XPadding = 0.3, 
  ZPadding = 0.05,
  Colors = d3.schemeCategory10
} = {}) {
  // 오류 출력
  if(typeof GraphTag !== 'string'){console.error(`"GraphTag" is not string type.`);return;}
  else if(typeof OuterWidth !== 'number'){console.error(`"OuterWidth" is not number type.`);return;}
  else if(typeof OuterHeight !== 'number'){console.error(`"OuterHeight" is not number type.`);return;}
  else if(typeof Margin !== 'object'){console.error(`"OuterWidth" is not object type. If you don't know Margin's form, see the following example.\nconst Margin = {top: 50, bottom: 100, left: 100, right: 100};`);return;}
    else if(typeof Margin.top !== 'number'){console.error(`"Margin.top" must be number type. `);return;}
    else if(typeof Margin.bottom !== 'number'){console.error(`"Margin.bottom" must be number type.`);return;}
    else if(typeof Margin.left !== 'number'){console.error(`"Margin.left" must be number type.`);return;}
    else if(typeof Margin.right !== 'number'){console.error(`"Margin.right" must be number type.`);return;}
  else if(typeof XPadding !== 'number' || XPadding > 1 || XPadding < 0){console.error(`"XPadding" must be number between 0 to 1.`);return;}
  else if(typeof ZPadding !== 'number' || ZPadding > 1 || ZPadding < 0){console.error(`"ZPadding" must be number type between 0 to 1 value.`);return;}

  // 기존 그래프(<svg> 태그) 전부 삭제(그래프가 누적되는 것을 방지)
  d3.select(`div.${GraphTag}`).selectAll("svg").remove();

  // 데이터 추출
  const x = d => d.domain;
  const y = d => d.count;
  const z = d => d.legend;
  const X = d3.map(ChartData, x);
  const Y = d3.map(ChartData, y);
  const Z = d3.map(ChartData, z);

  let xDomain = X;
  let yDomain = [0, d3.max(Y)];
  let zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  const xRange = [Margin.left, OuterWidth - Margin.right];
  const yRange = [OuterHeight - Margin.bottom, Margin.top];

  // x, z축 도메인에 데이터가 없는 경우 생략
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // 크기, 축, 형식 지정
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(XPadding);
  const xzScale = d3.scaleBand(zDomain, [0, xScale.bandwidth()]).padding(ZPadding);
  const yScale = d3.scaleLinear(yDomain, yRange);
  const zScale = d3.scaleOrdinal(zDomain, Colors);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  let yFormat;
  const yAxis = d3.axisLeft(yScale).ticks(OuterHeight / 60, yFormat);

  // 그래프 영역 지정
  const svg = d3.select(`div.${GraphTag}`)
    .append("svg")
    .attr("width", OuterWidth)
    .attr("height", OuterHeight)
    .attr("viewBox", [0, 0, OuterWidth, OuterHeight])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // y축 그리기
  let yLabel;
  svg.append("g")
    .attr("transform", `translate(${Margin.left},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
      .attr("x2", OuterWidth - Margin.left - Margin.right)
      .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
      .attr("x", -Margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text(yLabel));

  // 막대 그리기
  svg.append("g")
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("x", i => xScale(X[i]) + xzScale(Z[i]))
      .attr("y", i => yScale(Y[i]))
      .attr("width", xzScale.bandwidth())
      .attr("height", i => yScale(0) - yScale(Y[i]))
      .attr("fill", i => zScale(Z[i]));

  svg.append("g")
    .attr("transform", `translate(0,${OuterHeight - Margin.bottom})`)
    .call(xAxis);

  // 그래프에 제목 추가
  svg.append('text')
    .attr('x', OuterWidth / 2)
    .attr('y', Margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('text-size', '10px')
    .style('font-weight', 'bold')
    .text(Title);

  // 범례 사이 간격 계산
  let legendWidthLength = [0];
  for(let i = 0; i < Legend.length; i++){
    legendWidthLength.push(legendWidthLength[i] + Legend[i].length * 15 + 30);
  }

  // 범례 추가
  for(let i = 0; i < Legend.length; i++){
    svg.append("circle")
      .attr("cx", (OuterWidth - legendWidthLength[legendWidthLength.length - 1]) / 2 + legendWidthLength[i])
      .attr("cy", OuterHeight - Margin.bottom / 2)
      .attr("r", 6)
      .style("fill", Colors[i]);
    svg.append("text")
      .attr("x", (OuterWidth - legendWidthLength[legendWidthLength.length - 1]) / 2 + legendWidthLength[i] + 10)
      .attr("y", OuterHeight - Margin.bottom / 2 + 2)
      .text(Legend[i])
      .style("font-size", "15px")
      .attr("alignment-baseline","middle");
  }
}

const ChartSelector = (ChartType, GraphTag, ChartData, {
  Title,
  Domain,
  Legend,
  OuterWidth, 
  OuterHeight, 
  Margin, 
  XPadding, 
  ZPadding,
  Colors
} = {}) => {
  switch (ChartType){
    case 'bar':
      DrawBarGraph(GraphTag, ChartData, {
        Title, Domain, OuterWidth, OuterHeight, Margin, Colors
      });
      break;
    case 'circle':
      DrawCircleGraph(GraphTag, ChartData, {
        Title, Domain, OuterWidth, OuterHeight, Margin, Colors
      });
      break;
    case 'grouped-bar':
      DrawGroupedGraph(GraphTag, ChartData, {
        Title, Domain, Legend, OuterWidth, OuterHeight, Margin, XPadding, ZPadding, Colors
      });
  }

}

export default ChartSelector;