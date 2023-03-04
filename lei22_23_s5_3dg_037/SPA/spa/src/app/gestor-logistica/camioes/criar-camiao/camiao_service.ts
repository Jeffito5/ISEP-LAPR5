import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import config from '../../../../../config';

export interface Camiao{
    id: string,
    matricula:string,
    tara: string,
    capacidadeCarga: string,
    cargaBaterias: string,
    autonomia: string,
    tempoCarregamento: string
}

@Injectable()
export class CamiaoService {
  updateAtivo(row: any) {
    // Make a PUT request to the server to update the 'ativo' attribute of the row in the database
    this.http.put('/api/update-ativo/' + row.id, { ativo: !row.ativo }).subscribe(() => {
      // Update the 'ativo' value in the UI
      row.ativo = !row.ativo;
    });
  }
  constructor(private http: HttpClient) {}

  camiaoUrl=config.moduloLogistica.hostCamiao;

  getCamioes(){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': 'https://localhost:3000','Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type', 'Access-Control-Allow-Credentials': 'true'});

    return this.http.get<Camiao>(this.camiaoUrl/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }

  adicionarCamiao(matricula:string,tara: string,capacidadeCarga: string,cargaBaterias: string, autonomia: string,tempoCarregamento: string){
    const body = {
      
      'matricula': matricula,
      'tara': tara,
      'capacidadeCarga': capacidadeCarga,
      'cargaBaterias': cargaBaterias,
      'autonomia': autonomia,
      'tempoCarregamento': tempoCarregamento
    }
    return this.http.post<Camiao>(this.camiaoUrl,body);
    
  }

  getConfigResponse(): Observable<HttpResponse<Camiao>> {
    return this.http.get<Camiao>(
      this.camiaoUrl, { observe: 'response' });
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