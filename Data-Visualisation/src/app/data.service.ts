import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'd3';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    
  }
  

  private URL = "https://api.github.com/repos/torvalds/linux/stats/participation"

  
  

  public getRemoteData(){

    return this.http.get(this.URL)
 
    
      
  }
 
}
