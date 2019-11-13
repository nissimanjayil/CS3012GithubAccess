import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { requestModel } from './request.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    
  }
  

  private URL = "https://api.github.com/repos/torvalds/linux/stats/participation"

  allCommits:Array<Object> =['Week','Commits'];
  ownerCommits:Array<Object>=['Week','Commits'];
  participation:Observable<requestModel>
  output:any;
  public getRemoteData(){

     this.http.get(this.URL).subscribe((data:Array<Object>=[])=>{  
     
    
      var i = data['all'].length;

      //Pushes all the userCommits into the array allUser.
      var j=0;
      var k=0;
      while(j<i){
        this.allCommits['Week'] = k;
        this.allCommits['Commits'] = data['all'][j]
       
        j++;
        k++;
      }
     this.output = JSON.stringify(this.allCommits)
     console.log(this.output)
      // this.participation = this.output;
      // console.log(this.allCommits)

      //Pushes all the ownerCommits into the array ownerCommits
     
      var n = data['owner'].length;
      var c =0;
      var d =0;
      while(c < n){
        this.ownerCommits['Week'] =c;
        this.ownerCommits['Commits'] = data['owner'][d];
        c++;
        d++;
      }
      // console.log(this.ownerCommits)
    });
    
     
  }
}
