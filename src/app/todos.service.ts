import { Injectable } from '@angular/core';
import { Todo } from './interfaces/todos.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
    
  public todosSubject$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject$.asObservable();

  setTodos(todos: Todo[]): void {
    this.todosSubject$.next(todos);
  }

  createTodo(todo: Todo): void {
    const existingTodos = this.todosSubject$.value.find(
      (currentElement: Todo) => currentElement.title === todo.title
    );
    if (existingTodos !== undefined) {
      alert('Такая задача уже существует');
    } else {
      this.todosSubject$.next([...this.todosSubject$.value, todo]);
      alert('Задачa успешно создана');
    }
    this.todosSubject$.next([...this.todosSubject$.value, todo]);
  }

  deleteTodo(id: number): void {
    this.todosSubject$.next(
      this.todosSubject$.value.filter((item: Todo) =>
        id === item.id ? false : true
      )
    );
  }
  
}
