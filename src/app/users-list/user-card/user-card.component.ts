import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import {MatDialog,} from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { CustomUpperCasePipe } from "../../pipes/upper-case.pipe";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true, 
    imports: [CustomUpperCasePipe]
})

export class UserCardComponent {
    @Input()
    user: any

    @Output()
    deleteUser = new EventEmitter()  
    
    @Output()
    editUser = new EventEmitter()
    
    readonly dialog = inject(MatDialog);
    
    openDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: {user: this.user},
        });
    
        dialogRef.afterClosed().subscribe((editResult) => {
            console.log('модалка закрыта, значение формы', editResult);
            if (!editResult) return;
            this.editUser.emit(editResult);
        });
      }
      
    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId);
    }
}
    