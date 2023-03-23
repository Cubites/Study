import ChartSelector from './DrawGraph';
import * as d3 from 'd3';

export default function MakeGraph(GraphData, ChartType, {
    Title, // Title of Graph
    Domain, // Main Domain to use Circle chart, Bar chart
    AddDomainText, // Additional text next to domain when will be shown chart
    DomainIndex, // Domain index in GraphData
    Legend, // to use sub domain that use Stacked bar chart, Grouped bar chart
    AddLegendText, // Additional text next to legend when will be shown chart
    LegendIndex, // Legend index in GraphData
    GraphTag, // Tag's class name that graph insert
    OuterWidth = document.querySelector(`.${GraphTag}`).offsetWidth, // Width that graph area(include margin)
    OuterHeight = document.querySelector(`.${GraphTag}`).offsetHeight, // Height that graph area(include margin)
    Margin = {top: 100, bottom: 100, left: 100, right: 100}, // Margin out of graph
    XPadding = 0.3, // space between bars
    ZPadding = 0.05, // space between grouped bars
    DomainEqualValue = false, // Check that is Domain same to value
    Colors = d3.schemeCategory10
} = {}){
    let datum;
    let ChartData = [];
    if(!Legend){
        // Data set for chart to need domain-count data.
        // ex) Circle chart, Bar chart
        for(let d of Domain){
            ChartData.push({domain: d + (AddDomainText ? AddDomainText : ''), count: 0});
        }
        if(!DomainEqualValue){
            for(let d of GraphData){
                datum = d.split(" ");
                ChartData[Number(datum[DomainIndex])].count += 1;
            }
        }else{
            for(let d of GraphData){
                datum = d.split(' ');
                ChartData[Domain.indexOf(datum[DomainIndex])].count += 1;
            }
        }
    }else{
        // Data set for chart to need domain-legend-count data.
        // ex) Grouped bar chart, Stacked bar chart
        for(let d of Domain){
            for(let l of Legend){
                ChartData.push({
                    domain: d + (AddDomainText ? AddDomainText : ''), 
                    legend: l + (AddLegendText ? AddLegendText : ''), 
                    count: 0
                });
            }
        }
        if(!DomainEqualValue){
            for(let d of GraphData){
                datum = d.split(' ');
                ChartData[Number(datum[DomainIndex]) * Legend.length + Number(datum[LegendIndex])].count += 1;
            }
        }else{
            for(let d of GraphData){
                datum = d.split(' ');
                ChartData[Domain.indexOf(datum[DomainIndex]) * Legend.length + Number(datum[LegendIndex])].count += 1;
            }
        }
    }

    ChartSelector(ChartType, GraphTag, ChartData, {
        Title,
        Domain: Domain.map(d => d + (AddDomainText ? AddDomainText : '')),
        Legend,
        OuterWidth, 
        OuterHeight, 
        Margin, 
        XPadding, 
        ZPadding,
        Colors
    });
}