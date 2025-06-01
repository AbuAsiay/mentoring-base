import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly todosService = inject(TodosService);

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
                this.todosService.setTodos(response);
            }
        )

        this.todosService.todos$.subscribe(
            (todos: any) => {
                console.log('todos', todos);
            }
        )
    }

    deleteTodo(id: any) {
        this.todosService.deleteTodo(id)
    }

    public createTodo(formData: any) {  // подправить тип any на Todo НО это показывет на видио д\з 30 сентября.
        this.todosService.createTodo({
            id: new Date().getTime(),
            title: formData.title,
            userId: formData.userId,
            completed: formData.completed,
        })

        console.log('ДАННЫЕ ФОРМЫ:', event);
    }
}