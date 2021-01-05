import { Component, OnInit } from '@angular/core';
import { FoodImageReplaceService } from '../../../service/foodImageReplace.service'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-food-image-replace',
  templateUrl: './food-image-replace.component.html',
  styleUrls: ['./food-image-replace.component.css']
})
export class FoodImageReplaceComponent implements OnInit {
  profileForm = new FormGroup({
    filterData: new FormControl('')
  });
  selectFilter = "logno";
  contractData = [];
  

  constructor(private service: FoodImageReplaceService) { 

  }

  onSubmit(){

    let data = {
      selectFilter: this.selectFilter,
      payload: this.profileForm.value.filterData
    }
    console.log(data)
    this.service.getFoodImageReplace(data).subscribe(
      data => {
        this.contractData = data;
        console.log(this.contractData[0])
    })
  }

  selectFilterOption(value){
    this.selectFilter = value;
  }


  ngOnInit(): void {
  }

}
