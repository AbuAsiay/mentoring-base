import { Injectable } from "@angular/core";
import { Todo } from "./interfaces/todos.interface";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root' })
export class TodosService {
    public todosSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todosSubject$.asObservable();



    setTodos(todos: Todo[]) {
        this.todosSubject$.next(todos);
    }

    createTodo(todo: Todo) {
        const existingTodos = this.todosSubject$.value.find(
            currentElement => currentElement.title === todo.title
        );
        
        

        if (existingTodos !== undefined) {
            alert('Такая задача уже существует');
        } else
            this.todosSubject$.next([...this.todosSubject$.value, todo]);
        alert('Задачa успешно создана');
    }

    deleteTodo(id: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
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


