import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { FoodContentComponent } from './containers/views/food-content/food-content.component';
import { FoodImageReplaceComponent } from './containers/views/food-image-replace/food-image-replace.component';
import { FoodImageComponent } from './containers/views/food-image/food-image.component';
import { FoodItemComponent } from './containers/views/food-item/food-item.component';
import { FoodSectionComponent } from './containers/views/food-section/food-section.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'viewFoodItem',
        component: FoodItemComponent,
        data: {
          title: "FoodItem Page"
        }
      },
      {
        path: 'viewFoodContent',
        component: FoodContentComponent,
        data: {
          title: "FoodContent Page"
        }
      },
      {
        path: 'viewFoodImage',
        component: FoodImageComponent,
        data: {
          title: "FoodImage Page"
        }
      },
      {
        path: 'viewFoodImageReplace',
        component: FoodImageReplaceComponent,
        data: {
          title: "FoodImageReplace Page"
        }
      },
      {
        path: 'viewFoodSection',
        component: FoodSectionComponent,
        data: {
          title: "FoodSection Page"
        }
      },

      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
