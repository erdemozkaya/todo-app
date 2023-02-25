import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent
      }
    ]),
    AddTodoComponent,
    TodoListComponent,
    MatProgressSpinnerModule
  ]
})
export class LayoutModule { }
