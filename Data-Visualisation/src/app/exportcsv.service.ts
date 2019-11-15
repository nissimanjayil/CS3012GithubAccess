import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ExportcsvService {

constructor(private http: HttpClient){}
  static exportToCsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  getData(){
    this.http.get('assets/test.csv', {responseType: 'text'}).subscribe(
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
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function (d) { return x(d.Week); } )
    .attr("cy", function (d) { return y(d.Commit); } )
    .attr("r", 5)
    .style("fill", function (d) { return color(d.Species) } )
    

   
    }


      },
      error => {
          console.log(error);
      }
      
      
  );
  }
}

