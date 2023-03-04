import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Armazem } from '../../../gestor-armazem/armazem/criar-armazem/armazem.service';
import config from '../../../../../config';

export interface Rota{
    id: string,
    idArmazemOrigem: string,
    idArmazemDestino: string,
    distancia: number,
    energiaGasta: number,
    tempoMaximo: number,
    tempoExtra: number
}

export let rotas : Rota[]= [];
export let armazens : Armazem[]= [];

@Injectable()
export class RotaService {
  constructor(private http: HttpClient) {}

  rotaUrl= config.moduloLogistica.hostRota;
  armazemUrl= config.moduloArmazem.hostArmazem;

  getRotas(){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': ' http://localhost:3000','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'Access-Control-Allow-Credentials': 'true'});

    return this.http.get<Rota>(this.rotaUrl/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }

  getArmazens(){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': 'https://localhost:7097','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'Access-Control-Allow-Credentials': 'true'});

    return this.http.get<Armazem>(this.armazemUrl/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }

  adicionarRota(idArmazemOrigem: string, idArmazemDestino: string, distancia: string, energiaGasta: string, tempoMaximo: string, tempoExtra: string){
    const body = {
      'idArmazemOrigem': idArmazemOrigem,
      'idArmazemDestino': idArmazemDestino,
      'distancia': distancia,
      'energiaGasta': energiaGasta,
      'tempoMaximo': tempoMaximo,
      'tempoExtra': tempoExtra
    }
    return this.http.post<Rota>(this.rotaUrl, body, { observe: 'response' }).pipe(map(data => {
      return data
    }));
  }

  getConfigResponse(): Observable<HttpResponse<Rota>> {
    return this.http.get<Rota>(
      this.rotaUrl, { observe: 'response' });
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