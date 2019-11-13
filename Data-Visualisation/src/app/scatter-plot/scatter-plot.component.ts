import {  Component, ElementRef, ViewChild, OnInit, Input   } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {
  

  

  private htmlElement:HTMLElement;
  constructor(private elementRef: ElementRef
    ,private dataservice:DataService) {
      
     }
  
  
 
  ngOnInit() {

    this.dataservice.getRemoteData();
    

}

      
    
  
 
};

