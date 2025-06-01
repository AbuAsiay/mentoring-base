import { Injectable } from '@angular/core';
import { User } from './interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  setUsers(users: User[]) {
    this.usersSubject$.next(users);
  }

  editUsers(editedUser: User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map((user: User) =>
        user.id === editedUser.id ? editedUser : user
      )
    );
  }

  createUser(user: User) {
    const userIsExisting: User | undefined = this.usersSubject$.value.find(
      (currentElement: User) => currentElement.email === user.email
    );

    if (userIsExisting !== undefined) {
      alert('Пользователь с таким Еmail уже существует');
    } else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert('Новый пользователь усешно добавлен');
    }
  }

  deleteUser(id: number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((item: User) =>
        id === item.id ? false : true
      )
    );
  }
}
