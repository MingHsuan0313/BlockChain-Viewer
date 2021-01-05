import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: "root"
  })
  export class FoodImageReplaceService{
      private configURL = "http://localhost:8000/foodchain/foodImageReplace";
      constructor(private http: HttpClient){
          
      }
  
      getFoodImageReplace(body:{}){
  
          // this.http.post<any>(this.configURL, body).subscribe(data => {
          //     console.log(data);
          // })
          return this.http.post<any>(this.configURL, body);
      }
  
  }