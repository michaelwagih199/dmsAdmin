import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_RULES= 'user-roles';
const USER_NAME_KEY = 'userName';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveRoles(roles: any) {
    
    window.sessionStorage.removeItem(USER_RULES);
    window.sessionStorage.setItem(USER_RULES, roles.name);
  }

  public getToken(): any{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
    window.sessionStorage.setItem(USER_NAME_KEY, user);
  }

  public getUser(){
    return sessionStorage.getItem("USER_KEY")
  }
}
