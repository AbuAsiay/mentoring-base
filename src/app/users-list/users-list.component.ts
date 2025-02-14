import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from '../users.service';
import { map } from 'rxjs';



@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'], 
    standalone : true,
    imports: [NgFor, UserCardComponent , AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
  readonly usersService = inject(UsersService)
  readonly usersApiService = inject(UsersApiService)
    users = this.usersService.users$
 

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.users = (response);
            }
       )
    }


    deleteUser(id: number) {
        this.users = this.users.pipe(
            map(users => users.filter(user => user.id !== id))
        );
    }
}
    // deleteUser(id: number) {
    //     this.users = this.users.pipe(
    //       map(users => users.filter(user => user.id !== id))
    //     );
    //   }
    // }

