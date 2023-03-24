import ChartSelector from './DrawGraph';
import * as d3 from 'd3';

export default function MakeGraph(GraphData, ChartType, {
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
} = {}){
    let datum;
    let ChartData = [];
    if(!Legend){
        // 도메인-데이터로 차트를 그리는 경우(서브 도메인 없음)
        // 예) 원형 그래프, 막대 그래프
        for(let d of Domain){
            ChartData.push({domain: d + (AddDomainText ? AddDomainText : ''), count: 0});
        }
        if(!DomainEqualValue){
            for(let d of GraphData){
                datum = d.split(" ");
                if(FilterValue){
                    ChartData[Number(datum[DomainIndex])].count += Number(datum[FilterLegendIndex]) != FilterLegend.indexOf(FilterValue) ? 1 : 0;
                }else{
                    ChartData[Number(datum[DomainIndex])].count += 1;
                }
            }
        }else{
            for(let d of GraphData){
                datum = d.split(' ');
                if(FilterValue){
                    ChartData[Domain.indexOf(datum[DomainIndex])].count += Number(datum[FilterLegendIndex]) != FilterLegend.indexOf(FilterValue) ? 1 : 0;
                }else{
                    ChartData[Domain.indexOf(datum[DomainIndex])].count += 1;
                }
            }
        }
    }else{
        // 도메인-서브 도메인-데이터로 그래프를 그리는 경우
        // 예) 묶은 막대 그래프, 누적 막대 그래프
        for(let d of Domain){
            for(let l of Legend){
                ChartData.push({
                    domain: d + (AddDomainText ? AddDomainText : ''), 
                    legend: l + (AddLegendText ? AddLegendText : ''), 
                    count: 0
                });
            }
        }
        if(DomainEqualValue){
            if(LegendEqualValue){
                for(let d of GraphData){
                    datum = d.split(' ');
                    ChartData[Domain.indexOf(datum[DomainIndex]) * Legend.length + Legend.indexOf(datum[LegendIndex])].count += 1;
                }
            }else{
                for(let d of GraphData){
                    datum = d.split(' ');
                    ChartData[Domain.indexOf(datum[DomainIndex]) * Legend.length + Number(datum[LegendIndex])].count += 1;
                }
            }
        }else{
            if(LegendEqualValue){
                for(let d of GraphData){
                    datum = d.split(' ');
                    ChartData[Number(datum[DomainIndex]) * Legend.length + Legend.indexOf(datum[LegendIndex])].count += 1;
                }
            }else{
                for(let d of GraphData){
                    datum = d.split(' ');
                    ChartData[Number(datum[DomainIndex]) * Legend.length + Number(datum[LegendIndex])].count += 1;
                }
            }
        }
    }

    const RealMargin = {
        top: Margin.top < 1 ? OuterHeight * Margin.top : Margin.top,
        bottom: Margin.top < 1 ? OuterHeight * Margin.bottom : Margin.bottom,
        left: Margin.left < 1 ? OuterWidth * Margin.left : Margin.left,
        right: Margin.right < 1 ? OuterWidth * Margin.right : Margin.right
    }

    ChartSelector(ChartType, GraphTag, ChartData, {
        Title,
        Domain: Domain.map(d => d + (AddDomainText ? AddDomainText : '')),
        Legend: Legend?.map(d => d + (AddLegendText ? AddLegendText : '')),
        OuterWidth, 
        OuterHeight, 
        Margin: RealMargin, 
        XPadding, 
        ZPadding,
        Colors
    });
}