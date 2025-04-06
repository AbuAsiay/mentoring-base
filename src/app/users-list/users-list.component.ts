import { AsyncPipe, formatDate, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from '../users.service';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss', 
    standalone : true,
    imports: [NgFor, UserCardComponent , AsyncPipe , CreateUserFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService)
  readonly usersService = inject(UsersService)
  
    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.usersService.setUsers(response);
            },
       );
       
       this.usersService.users$.subscribe (
        users => console.log(users)
       );
    };
    
    public createUser(formData: any) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website:formData.website,
            company: {
                name: formData.companyName,
            },
        });
        console.log('ДАННЫЕ ФОРМЫ: ',);
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id);
    }
    
    editUser(userData: any) {
        if (!userData) {
            return;
        }
        
        this.usersService.editUsers({
            ...userData,
            company: {
                name: userData.companyName
            }
        });
    }
}