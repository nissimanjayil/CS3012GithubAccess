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
  private commits:Array<Object>=[];
  private committer:Array<Object>=[];
  commitData: Observable<requestModel>;
  output:any;

  private URL = "https://api.github.com/repos/torvalds/Linux/commits"

  public getRemoteData(){
    return this.http.get(this.URL).subscribe((data:Array<Object>=[])=>{   
      var i = data.length;
      // console.log(i);

      var j=0;
      var k=0;
      while(j<i){
        // console.log("j:",j);
        // console.log("k:",k);
        this.commits[j] = data[k]['commit'];
        // console.log("Index:" ,this.commits[j]);
        j++;
        k++;
        // console.log("j after:",j);
        // console.log("k after:",k);

      }

      var c =0;
      
      while(c < this.commits.length){
        // console.log("Yayyy",c);
        this.committer[c] = this.commits[c]['committer']
        // console.log("Index:" ,this.committer[c]);
        c++;
        // console.log("c after:",c);
      }
      
      this.output=JSON.stringify(this.committer);
      // console.log(this.output)
      this.commitData = this.output;
      console.log(this.commitData)

      
      return this.commitData;

    });

  }

  
 
}
