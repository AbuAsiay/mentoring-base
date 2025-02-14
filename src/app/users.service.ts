import { Injectable } from "@angular/core";
import { User } from "./interfaces/users.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();
    users: User[] = [];

    setUsers(users: User[]) {
        this.usersSubject$.next(users);
        console.log(users)
    }

    editUsers(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    if (user.id === editedUser.id) {
                        return editedUser
                    }else {
                        return user
                    }
                }
            )
        )
    }

    createUser(user: User) {
        this.usersSubject$.next(
            [...this.usersSubject$.value, user]
        )
    }

    deleteUser (id: number) {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                item => {
                    if (id === item.id) {
                        return false
                    } else {
                        return true; 
                    }
                }
            )
        )
    }
}