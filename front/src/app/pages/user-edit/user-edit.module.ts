import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {FormsModule} from "@angular/forms";
import {UserEditComponent} from "./user-edit.component";

@NgModule({
  declarations: [
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserEditComponent,
      },
    ]),
    FormsModule,
    MdbModalModule,
    MdbFormsModule,
    MdbRippleModule
  ],
  providers: [
    UserService,
  ]
})
export class UserEditModule { }
