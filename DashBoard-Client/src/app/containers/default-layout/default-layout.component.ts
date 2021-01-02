import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  routeState: any;
  data:any;

  constructor(private router: Router) {
    this.data = {};
    if(this.router.getCurrentNavigation().extras.state) {
      console.log("heree")
      this.routeState = this.router.getCurrentNavigation().extras.state;
      console.log(this.routeState);
      if(this.routeState) {
        this.data.username = this.routeState.username || "";
      }
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
