import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  foodItemEvents: FoodItemEvent[];
  foodItemEventsShowed: FoodItemEvent[];

  searchOption: string;
  searchValue: string;
  isSearching: boolean;
  tabs: any[];

  constructor() {
    this.searchOption = "logno";
    this.searchValue = "";
    this.isSearching = false;
    this.tabs = [];
  }

  selectFilterOption(value) {
    this.searchOption = value;
  }

  changePage(event, tab) {
    let begin = 5 * tab;
    let end = begin + 5;
    this.foodItemEventsShowed = this.foodItemEvents.slice(begin, end);

    let ulElement = event.target.parentElement.parentElement;
    let liList = ulElement.children;
    for (let index = 0; index < liList.length; index++) {
      liList[index].className = "page-item";
    }
    event.target.parentElement.className = "page-item active";
    // console.log(ulElement);
  }

  async search() {
    this.isSearching = true;
    console.log(`search\noption = ${this.searchOption}\nvalue = ${this.searchValue}`);

    await axios.get('http://localhost:8000/foodchain/fooditem', {
      params: {
        [this.searchOption]: this.searchValue
      },
      withCredentials: true
    }).then((response) => {
      this.isSearching = false;
      this.foodItemEvents = [];
      let status = response.status;
      if (status != 200)
        return;

      for (let index = 0; index < response.data.length; index++) {
        let foodSectionEvent = response.data[index];
        this.foodItemEvents.push(foodSectionEvent);
      }
      console.log(this.foodItemEvents);
      let tabNum = response.data.length / 5;
      this.tabs = [];
      for (let index = 0; index < tabNum; index++)
        this.tabs.push(index);
    }).catch(error => {
      this.isSearching = false;
    })
  }

  ngOnInit(): void {
  }

}

class FoodItemEvent {

}
