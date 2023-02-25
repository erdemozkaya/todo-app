import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

//material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/models/todo.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  newTaskControl = new FormControl(null, [Validators.required]);

  constructor(
    private _todo: TodoService
  ){}

  addTodo(){
    if(this.newTaskControl.invalid){
      return;
    }

    const newTodo:ITodo = {
      id: uuid(),
      title: this.newTaskControl.value,
      createdOn: new Date(),
      isDone: false
    }
    this._todo.addTodo(newTodo)
    .pipe(
      finalize(() => this.newTaskControl.reset())
    ).subscribe();
  }
}
