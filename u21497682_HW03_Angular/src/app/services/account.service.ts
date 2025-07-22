import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient) { }


  apiUrl = 'http://localhost:5240/api';
  isLoggedIn = false;


  Register(user:User)
  {
    return this.httpClient.post<User>(`${this.apiUrl}/Authentication/Register`, user)
  }

  Login(user:User)
  {
    return this.httpClient.post<User>(`${this.apiUrl}/Authentication/Login`, user)
  }

  checkLogin()
  {
    const isLoggedIn = false;
    if(localStorage.getItem('User'))
      {
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
      return isLoggedIn;
  }




}
