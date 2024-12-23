import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      loadChildren: () =>
        import('./pages/home/home.module').then((m) => m.HomeModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./pages/auth/auth.module').then((m) => m.AuthModule),
    },
    {
      path: 'home',
      loadChildren: () =>
        import('./pages/home/home.module').then((m) => m.HomeModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'reports',
      loadChildren: () =>
        import('./pages/reports/reports.module').then((m) => m.ReportsModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'reports/:reportId',
      loadChildren: () =>
        import('./pages/report-edit/report-edit.module').then((m) => m.ReportEditModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'users',
      loadChildren: () =>
        import('./pages/users/users.module').then((m) => m.UsersModule),
      canActivate: [AuthGuard],
    },
    {
      path: 'users/:userId',
      loadChildren: () =>
        import('./pages/user-edit/user-edit.module').then((m) => m.UserEditModule),
      canActivate: [AuthGuard],
    },
  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
