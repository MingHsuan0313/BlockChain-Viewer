import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})
export class FoodImageService{
    private configURL = "http://localhost:8000/foodchain/foodImage";
    constructor(private http: HttpClient){
        
    }

    getFoodImage(body:{}){

        // this.http.post<any>(this.configURL, body).subscribe(data => {
        //     console.log(data);
        // })
        return this.http.post<any>(this.configURL, body);
    }

}