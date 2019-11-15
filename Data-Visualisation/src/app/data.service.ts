import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { requestModel } from './request.model';
import { Observable } from 'rxjs';
import { map } from 'd3';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    
  }
  

  private URL = "https://api.github.com/repos/torvalds/linux/stats/participation"

  
  allCommits:Array<Object>=[];
  ownerCommits:Array<Object>=[];
  
  
  
  
  public getRemoteData(){

   return this.http.get(this.URL)
     
    
      
  }
 
}
