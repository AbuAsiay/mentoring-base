import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy,Component,inject,OnInit} from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../users.service';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { User } from '../interfaces/users.interface';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, UserCardComponent,
    AsyncPipe, CreateUserFormComponent, MatIconModule, CreateUserDialogComponent],
            changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  
    readonly dialog = inject(MatDialog);
  
  readonly usersApiService = inject(UsersApiService);
  private readonly usersService = inject(UsersService);
  users$: Observable<User[]> = this.usersService.users$;

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe((response: User[]) => {
      this.usersService.setUsers(response);
    });
  }

  createUser(formData: User) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.company.name,
      },
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  editUser(userData: undefined | User) {
    if (!userData) {
      return;
    }

    this.usersService.editUsers({
      ...userData,
      company: {
        name: userData.company.name,
      },
    });
  }
  
    openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: { user: this.users$},
    });

     dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        this.createUser(result);
      }
    });
  }
  createUserForm(user: User) {
    this.usersService.createUser(user); 
  }
}
