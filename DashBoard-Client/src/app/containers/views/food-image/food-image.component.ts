import { Component, OnInit } from '@angular/core';
import { versions } from 'process';
import { FoodImageService } from '../../../service/foodImage.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-food-image',
  templateUrl: './food-image.component.html',
  styleUrls: ['./food-image.component.css']
})
export class FoodImageComponent implements OnInit {
  

  profileForm = new FormGroup({
    filterData: new FormControl('')
  });
  selectFilter = "logno";
  contractData = [];
  

  constructor(private foodImageService: FoodImageService) { 

  }

  onSubmit(){

    let data = {
      selectFilter: this.selectFilter,
      payload: this.profileForm.value.filterData
    }
    console.log(data)
    this.foodImageService.getFoodImage(data).subscribe(
      data => {
        this.contractData = data;
        console.log(this.contractData[0].returnValues)
    })
  }

  selectFilterOption(value){
    this.selectFilter = value;
  }


  ngOnInit(): void {
  }

}
