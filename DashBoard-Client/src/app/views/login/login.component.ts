import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  username: string;
  password: string;
  loginFailed: boolean;

  constructor() {
    this.username = "";
    this.password = "";
    this.loginFailed = false;
  }

  async login() {
    console.log(`username : ${this.username}\npassword: ${this.password}`);
    await axios.post('http://localhost:8000/auth/login',{
      username:this.username,
      password:this.password
    }).then((response) => {
      console.log(response)
    },(error) => {
      console.log(error)
      this.loginFailed = true;
    })
  }
}
