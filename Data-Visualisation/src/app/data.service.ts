import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private URL = "https://api.github.com/repos/torvalds/Linux/commits"

  getRemoteData(){
    return this.http.get(this.URL);
   

  }
 
}
