import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-journal',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
[x: string]: any;
  user!: User | undefined;
  userId: number | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = Number(params['userId']);

      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe({
          next: (data) => {
            this.user = data;
          }
        });
      }
    })
  }

  delete(){
    this.activatedRoute.params.subscribe((params) => {
      this.userId = Number(params['userId']);

      this.userService.deleteUser(this.userId).subscribe(() => {
        this.router.navigate(['/users']) ;
      });
    })
  }

  save(name: string, login: string, password: string, department: string){
    if(!(name)) {
      alert("Вы указали не все данные")
      return;
    }

    let user = {
      id: this.user?.id,
      name: name,
      department: department
    } as User;

    if(this.userId){
      this.userService.updateUser(user)
        .pipe(
          catchError(err => this.errHandler(err))
        )
        .subscribe(() => {
        this.router.navigate(['/users']) ;
      });
    }
    else {
      this.userService.createUser(name, login, password, department)
        .pipe(
          catchError(err => this.errHandler(err))
        )
        .subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
  errHandler(error:HttpErrorResponse){
    alert("Что-то пошло не так");
    return throwError(() => error.message);
  }
}