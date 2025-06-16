import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
    selector: 'app-create-todo-form',
    templateUrl: './create-todo-form.component.html',
    styleUrl: './create-todo-form.component.scss',
    standalone: true,
    imports: [ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatIconModule],
})
export class CreateTodoFormComponent {
    
    @Output()
    createTodo = new EventEmitter();

    public form: FormGroup = new FormGroup({
        title: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
        userId: new FormControl<number>(0, [Validators.required, Validators.minLength(1)]),
        completed: new FormControl<boolean>(false, [Validators.required, Validators.minLength(2)]),
    });


    public submitForm(): void {
        this.createTodo.emit(this.form.value);
        this.form.reset();
    }
    
}

