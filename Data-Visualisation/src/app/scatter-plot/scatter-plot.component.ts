import {  Component, ElementRef, ViewChild, OnInit, Input   } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { ExportcsvService } from '../exportcsv.service';
import {HttpClient} from '@angular/common/http';
import { requestModel } from '../requestModel';


@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})

export class ScatterPlotComponent implements OnInit {
  
  constructor(elementRef:ElementRef,
    private httpClient:HttpClient,
    private display:ExportcsvService) {
     }
  
  ngOnInit() {

    
      // set the dimensions and margins of the graph
var margin = {top: 10, right: 50, bottom: 20, left: 50},
width = 1020 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")

     // Add the grey background that makes ggplot2 famous
svg
.append("rect")
  .attr("x",0)
  .attr("y",0)
  .attr("height", height)
  .attr("width", width)
  .style("fill", "EBEBEB")

      // Add X axis
  var x = d3.scaleLinear()
  .domain([0, 52*1.001])
  .range([ 0, width ])
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(10))
  .select(".domain").remove()


      // Add Y axis
  var y = d3.scaleLinear()
  .domain([-0.001, 2100])
  .range([ height, 0])
  .nice()
svg.append("g")
  .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
  .select(".domain").remove()

// Customization
svg.selectAll(".tick line").attr("stroke", "white")

     
 // Add X axis label:
 svg.append("text")
 .attr("text-anchor", "end")
 .attr("x", width/2 + margin.left)
 .attr("y", 390)
 .text("Weeks");

// Y axis label:
svg.append("text")
 .attr("text-anchor", "end")
 .attr("transform", "rotate(-90)")
 .attr("y", -margin.left + 20)
 .attr("x", -margin.top - height/3+ 90)
 .text("Weekly Commits")

// Color scale: give me a specie name, I return a color
var color = d3.scaleOrdinal()
.domain(["setosa", "versicolor", "virginica" ])
.range([ "#F8766D", "#00BA38", "#619CFF"])
      
    
     this.httpClient.get('assets/test.csv', { responseType: 'text' }).subscribe(data => {

      
      var objs = d3.csvParse(data);
     
       let csvRecord:requestModel = new requestModel();
        
       var count =0;
       
       while(count < objs.length){
       csvRecord.Week = objs[count]['Week'];
       csvRecord.Commit=objs[count]['Commit'];
       // Add dots
        svg.append('g')
        .selectAll("dot")
        .data(objs)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x( csvRecord.Week); } )
          .attr("cy", function (d) { return y(csvRecord.Commit); } )
          .attr("r", 3)
          .style("fill", "009933")
            count ++;
       }
      });

      this.httpClient.get('assets/Owner.csv', { responseType: 'text' }).subscribe(data => {
        var objs = d3.csvParse(data);
       
         let csvRecord:requestModel = new requestModel();
          
         var count =0;
         
         
         while(count < objs.length){
         csvRecord.Week = objs[count]['Week'];
         csvRecord.Commit=objs[count]['Commit'];
         // Add dots
          svg.append('g')
          .selectAll("dot")
          .data(objs)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x( csvRecord.Week); } )
            .attr("cy", function (d) { return y(csvRecord.Commit); } )
            .attr("r", 3)
            .style("fill", "#FF6666")
              count ++;
         }
        });
  
    
  

}
  
   
    

};




