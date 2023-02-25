import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';
import { ITodo } from '../models/todo.model';

export interface ITodoState {
  todos: ITodo[]
}

const INIT_STATE: ITodoState = {
  todos: []
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private API_ROOT: string = "http://localhost:3000/";

  private _todoSubject$: BehaviorSubject<ITodoState> = new BehaviorSubject<ITodoState>(INIT_STATE);
  public readonly todoSubject$ = this._todoSubject$.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  private _setSubject(todos: ITodo[]){
    this._todoSubject$.next({ todos });
  }

  getTodos(): Observable<ITodoState> {
    const apiUrl = `${this.API_ROOT}todos`;
    this._http.get<ITodo[]>(apiUrl)
    .pipe(delay(1000))
    .subscribe(res => this._setSubject(res.sort((a,b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())))

    return this.todoSubject$
  }

  addTodo(todo: ITodo): Observable<ITodo>{
    const apiUrl = `${this.API_ROOT}todos`;
    return this._http.post<ITodo>(apiUrl,todo)
    .pipe(
      delay(1000),
      tap(response => {

        this._setSubject([
          response,
          ...this._todoSubject$.getValue().todos
        ]);
      })
    )
  }

  updateTodo(todo: ITodo): Observable<ITodo>{
    const apiUrl = `${this.API_ROOT}todos/${todo.id}`;
    return this._http.put<ITodo>(apiUrl,todo)
    .pipe(
      delay(1000),
      tap(response => {
        let todos = this._todoSubject$.getValue().todos;

        todos = todos.map(m => {
          if(m.id === todo.id){
            return {
              ...m,
              ...response
            }
          }
          return m;
        });

        this._setSubject(todos);
      })
    )
  }

  /**
   * 
   * @returns returns true if the operation is successful, false otherwise
   */
  deleteTodo(id: string): Observable<boolean>{
    const apiUrl = `${this.API_ROOT}todos/${id}`;
    return this._http.delete<boolean>(apiUrl)
    .pipe(
      delay(1000),
      map(m => true),
      catchError(err => {
        if(err){
          console.log(err)
        }

        return of(false)
      }),
      finalize(() => {
        const todos = this._todoSubject$.getValue().todos.filter(f => f.id !== id);
        this._setSubject(todos);
      })
    )
  }
}
