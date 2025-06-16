import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TrucatePipe } from "../../pipes/truncate.pipe";
import { Todo } from "../../interfaces/todos.interface";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    standalone: true,
    imports: [TrucatePipe]
})
export class TodoCardComponent {
    
    @Input()
    todo!: Todo;

    @Output()
    deleteTodo = new EventEmitter<number>();

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId);
    }

}