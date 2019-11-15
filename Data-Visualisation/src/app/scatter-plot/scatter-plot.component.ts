import {  Component, ElementRef, ViewChild, OnInit, Input   } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { requestModel } from '../request.model';
import { ExportcsvService } from '../exportcsv.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {
  

  
  private htmlElement:HTMLElement;
  allCommits:Array<Object>=[];
  ownerCommits:Array<Object>=[];
  participation = Array<requestModel>();
  
 
  constructor(elementRef:ElementRef,
    private dataservice:DataService,
    private httpClient:HttpClient,
    private display:ExportcsvService) {
     }
  
    
 
     public var Weeks =[];
     public var CommitsAll=[];
     public var aCommits=[]; 
  ngOnInit() {

  
    
    this.dataservice.getRemoteData().subscribe((datta:Array<Object>)=>{
      var i = datta['all'].length;

      //Pushes all the userCommits into the array allUser.
      var j=0;
      var k=0;
      while(j<i){
        this.allCommits[j] = datta['all'][k];
        j++;
        k++;
      }


      //Pushes all the ownerCommits into the array ownerCommits

      var n = datta['owner'].length;
      var c =0;
      var d =0;
      while(c < n){
        this.ownerCommits[c] = datta['owner'][d];
        c++;
        d++;
      }
      var c=0;
      var d =0;
        
      var reformattedArray = this.allCommits.map(obj =>{ 
      
        const mapping = [null,'Week', 'Commit']; 
        aCommits.push({"Week":c,"Commit":this.allCommits[c]});
      
        c++;
      });

     
      var count  =0;
      
      while(count < aCommits.length){
        Weeks[count] = aCommits[count]['Week']
        count++;
      }
      console.log(Weeks)

      
      var l=0;
      while(l<aCommits.length){
        CommitsAll[l] = aCommits[l]['Commit']
      }
  
    
     


  

   
    });
    this.httpClient.get('assets/test.csv', {responseType: 'text'}).subscribe(
      data => { 
          // set the dimensions and margins of the graph
      var margin = {top: 10, right: 20, bottom: 20, left: 50},
      width = Weeks.length+1250 - margin.left - margin.right,
      height = 605 - margin.top - margin.bottom;

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
      .domain([20*0.25, 52*1.001])
      .range([ 0, width ])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(-height*1.7).ticks(10))
      .select(".domain").remove()

      // Add Y axis
  var y = d3.scaleLinear()
  .domain([-0.001, 2000*1.01])
  .range([ height, 0])
  .nice()
svg.append("g")
  .call(d3.axisLeft(y).tickSize(-width*1.3).ticks(7))
  .select(".domain").remove()

  // Customization
  svg.selectAll(".tick line").attr("stroke", "#EBEBEB")

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Weeks");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -margin.top)
      .text("Commit")

      // Color scale: give me a specie name, I return a color
  var color = d3.scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica" ])
  .range([ "#F8766D", "#00BA38", "#619CFF"])
        svg.append('g')
  .selectAll("dot")
  .data(aCommits)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(aCommits['Week']); } )
    .attr("cy", function (d) { return y(d.Commit); } )
    .attr("r", 5)
    // .style("fill", function (d) { return color(d.Species) } )
    


    


      },
      error => {
          console.log(error);
      }
      
      
  );

};


}

