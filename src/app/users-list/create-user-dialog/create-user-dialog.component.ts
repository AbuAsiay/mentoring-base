import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../interfaces/users.interface';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class CreateUserDialogComponent {
  dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    company: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    }),
  });

  submitForm() {
    if (this.form.valid) {
      const value = this.form.value as User;
      const user: User = {
        id: Date.now(),
        name: value.name,
        email: value.email,
        website: value.website,
        company: {
          name: value.company?.name,
        },
      };
      this.dialogRef.close(user);
      this.form.reset();
    }
  }
  
}

// export class CreateUserDialogComponent {
//   dialogRef = inject(MatDialogRef<CreateUserDialogComponent>);
// readonly data = inject(MAT_DIALOG_DATA);

//  @Output()
//     createUser = new EventEmitter();

//     public form = new FormGroup({
//         name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
//         email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
//         website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(2)]),
//         company: new FormGroup({
//             name: new FormControl(this.data.user.companyName, [Validators.required, Validators.minLength(2)]),
//         })

//     });

//    public submitForm(): void {
//         this.createUser.emit(this.form.value,);
//         this.form.reset();
//         console.log('form', this.form.value);
//     }

//     constructor() {
//         this.form.valueChanges.subscribe(
//             (value) => {
//                 console.log('value', value);
//             }
//         )
//     }

// }
