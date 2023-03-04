import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import config from '../../config';

export interface User {
  id: string,
  nome: string,
  email: string,
  password: string,
  dataNascimento: string,
  numeroTelefone: number,
  tipoUser: string
}

export let users : User[]= [];

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  userUrl = config.moduloLogistica.hostUser;
  loginUrl = config.moduloLogistica.hostLogin;

  adicionarUser(nome: string, email: string, password: string, dataNascimento: string, numeroTelefone: string, tipoUser: string) {
    const body = {
      'nome': nome,
      'email': email,
      'password': password,
      'dataNascimento': dataNascimento,
      'numeroTelefone': numeroTelefone,
      'tipoUser': tipoUser
    }
    return this.http.post<User>(this.userUrl, body, { observe: 'response' }).pipe(/*map(data => {
      return data
    })*/);
  }

  login(email: string, password: string){

    const body = {
      'email': email,
      'password': password
    }
    return this.http.post<User>(this.loginUrl,body,{observe: 'response'}).pipe(map(data => {
      return data
  }));
  }

  logout(){
    
    return this.http.post<User>(this.loginUrl,{observe: 'response'}).pipe(map(data => {
      return data
  }));
  }

  getUsers(){
    return this.http.get<User>(this.userUrl/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }
  
  anonimizarUser(email: string) {
    return this.http.delete<User>(this.userUrl+email,{ observe: 'response' }).pipe();
  }

  getConfigResponse(): Observable<HttpResponse<User>> {
    return this.http.get<User>(
      this.userUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}