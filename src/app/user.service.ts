import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null);
  public readonly user$ = this.userSubject$.asObservable();

  private user: IUser = {
    name: 'John Doe',
    email: 'Jonn',
    isAdmin: false,
  };

  // constructor() {
  //   this.userSubject$.next(this.user);
  // }

  loginAsAdmin() {
    this.userSubject$.next({ ...this.user, isAdmin: true });
  }

  loginAsUser() {
    this.userSubject$.next({ ...this.user, isAdmin: false });
  }

  get isAdmin() {
    return this.userSubject$.value?.isAdmin ?? false;
  }

  logout() {
    this.userSubject$.next(null);
  }
}