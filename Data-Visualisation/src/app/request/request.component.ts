import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {
  
   arrayData:Array<object>=[];
   filteredCommits:Array<object>=[];
 
  constructor(private dataService:DataService) { }
 
  ngOnInit() {
    
    this.dataService.getRemoteData().subscribe((data:Array<Object>=[])=>{   
      this.arrayData = data; 
      var k =0;
      var i=0;
     for(var j =0 ;j<this.arrayData.length;j++){
      this.filteredCommits[j] = this.arrayData[i]['commit']
      console.log("Filtered Commits")
      console.log(this.filteredCommits[k])
      i++;
      k++;
    }
    }); 
    
   
  
  }

  

}

  



