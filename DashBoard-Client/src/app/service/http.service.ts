import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: "root"
})
export class HTTPService{
    private configURL = "http://localhost:8000/foodInfo";
    constructor(private http: HttpClient){
        
    }

    getFoodData(){
        this.http.get<any>(this.configURL).subscribe(
            data => {
                console.log(data);
        })
    }

}