import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../user.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(public userService: UserService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'admin') {
        this.userService.loginAsAdmin();
      } else if (result === 'user') {
        this.userService.loginAsUser();
      }
    });
  }

  logout(): void {
    this.userService.logout();
  }
}
