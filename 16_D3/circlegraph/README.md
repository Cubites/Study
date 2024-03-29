# 원 그래프



## 예시(d3 v7 기준)
```javascript
const drawCircleGraph = (graphTag, sampleCountTag, data) => {
    // 기존에 그려진 그래프 삭제
    let removeSvg = d3.select(`div${graphTag}`).selectAll("svg").remove();

    // 반지름
    const radius = Math.min(width, height) / 2;

    const svg = d3
        .select(graphTag)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px');

    const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null); // 데이터를 큰 값 순서로 정렬하지 않고 입력받은 순서 그대로 표시

    const arcs = pie(data);
    
    // 데이터 파이 색칠 및 사이에 구분선 넣기
    g.selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('fill', d => d.data.color)
        .attr('stroke', 'white')
        .attr('d', arc)
        .append('title')
        .text(d => d.data.domain);

    const text = g.selectAll('text')
        .data(arcs)
        .enter().append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em');
    
    // 해당 파이 구역에 글자 넣기 - domain
    text.append('tspan')
        .attr('x', 0)
        .attr('y', '-0.7em')
        .style('font-weight', 'bold')
        .text(d => d.data.count !== 0 ? d.data.domain : ''); // 데이터가 0이면 domain을 표시하지 않음
    
    // 해당 파이 구역에 글자 넣기 - 데이터 값
    text.filter(d => (d.endAngle - d.startAngle > 0.25)).append('tspan')
        .attr('x', 0)
        .attr('y', '0.7em')
        .attr('fill-opacity', 0.7)
        .text(d => d.data.count);
}
```