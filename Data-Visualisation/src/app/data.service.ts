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
  allCommits:Array<Object> =[];
  ownerCommits:Array<Object>=[];
  
  allCommitData: Observable<requestModel>;
  ownerCommitData: Observable<requestModel>;
  output:any;

  private URL = "https://api.github.com/repos/torvalds/linux/stats/participation"

  public getRemoteData(){
    return this.http.get(this.URL);
      
  }

  
 
}
