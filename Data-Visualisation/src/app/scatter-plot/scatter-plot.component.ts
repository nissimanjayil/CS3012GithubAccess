import {  Component, ElementRef, ViewChild, OnInit, Input  } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {

  // data: requestModel[];
  constructor(private dataService : DataService) { }
  allCommits:Array<Object> =[];
  ownerCommits:Array<Object>=[];
  
  // allCommitData: Observable<requestModel>;
  // ownerCommitData: Observable<requestModel>;
  // output:any;
  ngOnInit() {
    

    this.dataService.getRemoteData().subscribe((data:Array<Object>=[])=>{  
     
    
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
    });
  }
 
};
