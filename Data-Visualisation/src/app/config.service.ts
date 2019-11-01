import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private owner : string;

  constructor(private http: HttpClient) {
    console.log("Github API.....")
    this.owner = ""
   }

   getRequest(){
     return this.http.get("http://api.github.com/users/");
     console.log("Success");

   }
}
