import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { getAlertConfig } from '../notifications/alerts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class RegisterComponent {
  username: string;
  password: string;
  email: string;
  repeatPassword: string;

  isRegisterError: boolean;
  registerErrorLog: string;

  constructor(private router: Router) {
    this.username = "";
    this.password = "";
    this.email = "";
    this.repeatPassword = "";

    this.isRegisterError = false;
    this.registerErrorLog = "";
  }

  isRegisterValid() {
    if(this.username.length < 3) {
      alert('username length should be more than 8');
      return false;
    }
    else if(this.password.length < 3) {
      alert('password length should be more than 8');
      return false;
    }
    else if(this.email.length < 8 && this.email.includes('@')) {
      alert('email not correctly');
      return false;
    }
    return true;
  }

  async register() {
    console.log(`username: ${this.username}\npassword: ${this.password}\nemail: ${this.email}\nrepeated-password: ${this.repeatPassword}`);
    if(!this.isRegisterValid())
      return;
    if (this.isPasswortRepeated()) {
      await axios.post('http://localhost:8000/auth/register', {
        username: this.username,
        password: this.password,
        email: this.email
      }).then((response) => {
        let status = response.status;
        if (status === 201) {
          console.log("register success navigate to login page")
          this.router.navigate(['/login']);
        }
      }, (error) => {
        this.isRegisterError = true;
        this.registerErrorLog = "username or email has been used";
      })
    }
    else {
      this.isRegisterError = true;
      this.registerErrorLog = "confirm password not the same as the password";
      alert('repeat password not correct')
    }
  }

  isPasswortRepeated() {
    if (this.password === this.repeatPassword)
      return true;
    else
      return false;
  }
}
