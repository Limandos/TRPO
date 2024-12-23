import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {User as User} from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
  private readonly USERS_URL = environment.gatewayUrl + "/users";

  constructor(private http: HttpClient, private router: Router) {
  }

  public getUsers() {
    return this.http.get<User[]>(this.USERS_URL + "/getUsers");
  }

  public getUserById(id: number) {
    return this.http.get<User>(this.USERS_URL + "/getUserById/" + id);
  }

  public createUser(name: string, login: string, password: string, department: string) {
    return this.http.post<User>(this.USERS_URL + "/createUser", {
      name: name,
      login: login,
      password: password,
      department: department
    }, httpOptions);
  }

  deleteUser(id: number) {
    return this.http.delete(this.USERS_URL + "/deleteUser/" + id);
  }

  updateUser(user: User) {
    return this.http.put<User>(this.USERS_URL + "/updateUser", {
      ...user
    }, httpOptions);
  }
}