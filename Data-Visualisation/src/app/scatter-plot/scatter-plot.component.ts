import {  Component, ElementRef, ViewChild, OnInit, Input   } from '@angular/core';
import * as D3 from 'd3';
import { DataService } from '../data.service';
import { requestModel } from '../request.model';
@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {
  

  
  private htmlElement:HTMLElement;

 
  constructor(elementRef:ElementRef,
    private dataservice:DataService) {
      this.htmlElement = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
      console.log(this.htmlElement);
      console.log(D3) 
     }
  
    
 
  allCommits:Array<Object>=[];
  ownerCommits:Array<Object>=[];
  participation = Array<requestModel>();
  ngOnInit() {
    let d3:any = D3;
    this.dataservice.getRemoteData().subscribe((data:Array<Object>)=>{
      var i = data['all'].length;

      //Pushes all the userCommits into the array allUser.
      var j=0;
      var k=0;
      while(j<i){
        this.allCommits[j] = data['all'][k];
        j++;
        k++;
      }


      //Pushes all the ownerCommits into the array ownerCommits

      var n = data['owner'].length;
      var c =0;
      var d =0;
      while(c < n){
        this.ownerCommits[c] = data['owner'][d];
        c++;
        d++;
      }
      var c=0;
      var d =0;
      var aCommits=[];   
      var reformattedArray = this.allCommits.map(obj =>{ 
        
          
        const mapping = [null,'Week', 'Commit']; 
        aCommits.push({"Week":c,"Commit":this.allCommits[c]});
      
        c++;
      });
     
    var margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date / time
  var parseDate = d3.timeParse("%Y-%m-%d");

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var line = d3.line()
    .x(function (d) {
      return x(this.participation.Week);
    })
    .y(function (d) {
      return y(this.participation.Commit);
    });

  var svg = d3.select(this.htmlElement).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // format the data
  data.forEach(function (d) {
    this.participation.Week = parseDate(this.participation.Week);
  });

  x.domain(d3.extent(data, function (d) {
    return this.participation.Week;
  }));

  y.domain([0, d3.max(data, function (d) {
    return this.participation.Week > this.participation.Commit ? this.participation.Week : this.participation.Commit;
  })]);

  // Add the line path.
  svg.append("path")
    .attr("class", "line")
    .style("fill", "none")
    .attr("d", line(aCommits))
    .style("stroke", "orange");

  // // change line to look at searches
  // line.y(function (d) {
  //   return y(d.searches);
  // });

  // Add the second line path.
  svg.append("path")
    .attr("class", "line")
    .style("fill", "none")
    .attr("d", line(aCommits))
    .style("stroke", "steelblue");

  // Add the scatterplot
  svg.selectAll("dot")
      .data(aCommits)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(this.participation.Week); })
      .attr("cy", function(d) { return y(this.participation.Commit); });

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

      

  });
   
    
  }
};

