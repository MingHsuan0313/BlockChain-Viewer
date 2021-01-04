import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-food-section',
  templateUrl: './food-section.component.html',
  styleUrls: ['./food-section.component.css']
})
export class FoodSectionComponent implements OnInit {

  foodSectionEvents: FoodSectionEvent[];
  searchOption: string;
  searchValue: string;
  isSearching: boolean;
  myString: string;

  constructor() {
    this.myString = "asldahdkjaknwqnnwqjqnnwqkrnjwqnwqjnwqrqq";
    this.searchOption = "logno";
    this.searchValue = "";
    this.isSearching = false;
  }

  selectFilterOption(value) {
    console.log('select option');
    console.log(value)
    this.searchOption = value;
  }

  async search() {
    this.isSearching = true;
    console.log(`search\noption = ${this.searchOption}\nvalue = ${this.searchValue}`);

    await axios.get('http://localhost:8000/foodchain/foodsection', {
      params: {
        [this.searchOption]: this.searchValue
      },
      withCredentials: true
    }).then((response) => {
      this.isSearching = false;
      let status = response.status;
      if(status != 200)
        return;
      for(let index = 0;index < response.data.length;index++) {
        let foodSectionEvent = response.data[index];
        this.foodSectionEvents.push(foodSectionEvent);
      }
    }).catch(error => {
      this.isSearching = false;
    })
  }

  ngOnInit(): void {
  }
}

class FoodSectionEvent {
  logno: string;
  title: string;
  begin: string;
  end: string;
  blockNumber: number;
  event: string;

  constructor() {
    this.logno = "";
    this.title = "";
    this.begin = "";
    this.end = "";
    this.event = "";
    this.blockNumber = 0;
  }

  setEvent(event: string) {
    this.event = event;
    return this;
  }

  setBlockNumber(blockNumber: number) {
    this.blockNumber = blockNumber;
    return this;
  }

  setLogno(logno: string) {
    this.logno = logno;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setBegin(begin: string) {
    this.begin = begin;
    return this;
  }

  setEnd(end: string) {
    this.end = end;
    return this;
  }
}
