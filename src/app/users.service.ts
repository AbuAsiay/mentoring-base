import { Injectable } from "@angular/core";
import { User } from "./interfaces/users.interface";
import { BehaviorSubject,} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
    public usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable();
    

    setUsers(users: User[]) {
        this.usersSubject$.next(users); 
    }
   
    editUsers(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    if (user.id === editedUser.id) {
                        return editedUser
                    } else {
                        return user
                    }
                }
            )
        )
    }

    createUser(user: User) {
        const userIsExisting = this. usersSubject$.value.find(
            (currentElement) => currentElement.email === user.email
        );
        
        if (userIsExisting !== undefined) {
            alert('Пользователь с таким Еmail уже существует');
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);   
            alert('Новый пользователь усешно добавлен');
        }
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