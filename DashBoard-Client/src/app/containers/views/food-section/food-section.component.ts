import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-food-section',
  templateUrl: './food-section.component.html',
  styleUrls: ['./food-section.component.css']
})
export class FoodSectionComponent implements OnInit {

  foodSectionEvents: FoodSectionEvent[];
  foodSectionEventsShowed: FoodSectionEvent[];

  searchOption: string;
  searchValue: string;
  isSearching: boolean;
  tabs: any[];

  logno: string;
  title: string;
  begin: string;
  end: string;


  constructor() {
    this.searchOption = "logno";
    this.searchValue = "";
    this.isSearching = false;
    this.tabs = [];

    this.logno = "";
    this.title = "";
    this.begin = "";
    this.end = "";
  }

  async submitData() {
    console.log(this.logno);
    console.log(this.title);
    console.log(this.begin);
    console.log(this.end);
    if(this.logno.length > 0 && this.title.length > 0) {
      if(this.begin.length > 0 && this.end.length > 0) {
        console.log("valid");
        await axios.post('http://localhost:8000/foodchain/foodsection', {
          logno: this.logno,
          title: this.title,
          begin: this.begin,
          end: this.end
        },{
          withCredentials: true
        }).then((response) => {
          console.log(response['data'])
          this.logno = "";
          this.title = "";
          this.begin = "";
          this.end = "";
        }).catch((error) => {})
      }
      console.log("invalid")
    }
    else
      console.log("invalid");
  }

  selectFilterOption(value) {
    console.log('select option');
    console.log(value)
    this.searchOption = value;
  }

  changePage(event, tab) {
    let begin = 5 * tab;
    let end = begin + 5;
    this.foodSectionEventsShowed = this.foodSectionEvents.slice(begin, end);

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

    await axios.get('http://localhost:8000/foodchain/foodsection', {
      params: {
        [this.searchOption]: this.searchValue
      },
      withCredentials: true
    }).then((response) => {
      this.isSearching = false;
      this.foodSectionEvents = [];
      let status = response.status;
      if (status != 200)
        return;
      for (let index = 0; index < response.data.length; index++) {
        let foodSectionEvent = response.data[index];
        this.foodSectionEvents.push(foodSectionEvent);
      }
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
