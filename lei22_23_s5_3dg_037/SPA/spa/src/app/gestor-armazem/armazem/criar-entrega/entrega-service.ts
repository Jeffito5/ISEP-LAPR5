import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import config from '../../../../../config';


export interface Entrega{
    id: string,
    dataEntrega: string,
    massaEntrega: number,
    tempoColocarEntrega: number,
    tempoRetirarEntrega: number,
    armazemId: string,
}

export let entregas : Entrega[]= [];

@Injectable()
export class EntregaService {
  constructor(private http: HttpClient) {}

  entregaUrl=config.moduloArmazem.hostEntrega;

  getEntregas(){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': 'https://localhost:7097','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'Access-Control-Allow-Credentials': 'true'});

    return this.http.get<Entrega>(this.entregaUrl/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }

  adicionarEntrega(data: string,massa: string,tempoColocarEntrega: string,tempoRetirarEntrega: string, idArmazem: string){
    const body = {
      'id': '',
      'dataEntrega': data,
      'massaEntrega': massa,
      'tempoColocarEntrega': tempoColocarEntrega,
      'tempoRetirarEntrega': tempoRetirarEntrega,
      'armazemId': idArmazem
    }
    return this.http.post<Entrega>(this.entregaUrl,body,{observe: 'response'}).pipe(map(data => {
      return data
  }));
  }

  getEntregaPorDataOuArmazemId(data: string){
    return this.http.get<Entrega>(this.entregaUrl+`${data}`).pipe(
      catchError(this.handleError)
    );
  }

  getConfigResponse(): Observable<HttpResponse<Entrega>> {
    return this.http.get<Entrega>(
      this.entregaUrl, { observe: 'response' });
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