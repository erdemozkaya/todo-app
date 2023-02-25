import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { ITodoState, TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ITodoState> = this._todo.todoSubject$;

  constructor(
    private _todo: TodoService
  ){}
  
  ngOnInit(): void {
    this._todo.getTodos();
  }

  //click on checkbox
  onCheckboxHandle(todo: ITodo, event: any){
    event.preventDefault();
    
    const newTodo = {...todo, isDone: !todo.isDone};

    this._todo.updateTodo(newTodo)
    .subscribe();
  }

  onDelete(todo: ITodo){
    this._todo.deleteTodo(todo.id)
    .subscribe();
  }

}
