import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ExportcsvService } from '../exportcsv.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  private htmlElement:HTMLElement;
  allCommits:Array<Object>=[];
  ownerCommits:Array<Object>=[];
  

  constructor(private dataservice:DataService,
    private httpClient:HttpClient,
    private display:ExportcsvService) {
     }
  
  ngOnInit() {
      var Weeks =[];
      var CommitsAll=[];
      var aCommits=[]; 
      var oCommits=[];
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
         
       var reformattedArray = this.allCommits.map(obj =>{ 
       
         const mapping = [null,'Week', 'Commit']; 
         aCommits.push({"Week":c,"Commit":this.allCommits[c]});
         oCommits.push({"Week":c,"Commit":this.ownerCommits[c]})
         c++;
       });
       console.log(oCommits)

       this.display.exportToCsv('Owner.csv',oCommits)
     
 
      
       
    
       
     });
  }

}
