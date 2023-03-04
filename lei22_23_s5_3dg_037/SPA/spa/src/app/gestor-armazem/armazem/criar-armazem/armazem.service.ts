import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import config from '../../../../../config';

export interface Armazem{
    id: string,
    designacao: string,
    endereco: string,
    longitude: number,
    latitude: number,
    altitude: number,
    ativo: boolean
}
export let armazens : Armazem[]= [];

@Injectable()
export class ArmazemService {
  constructor(private http: HttpClient) {}

  armazemUrl=config.moduloArmazem.hostArmazem;

  getArmazens(){
    return this.http.get<Armazem>(this.armazemUrl/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }

  getArmazensAtivos(){
    return this.http.get<Armazem>(this.armazemUrl+'Ativos/'/*, { headers }*/).pipe(
        catchError(this.handleError)
      );
  }

  adicionarArmazem(id: string,designacao: string,endereco: string,longitude: string, latitude: string,altitude: string,ativo: string){
    const body = {
      'id': id,
      'designacao': designacao,
      'endereco': endereco,
      'longitude': longitude,
      'latitude': latitude,
      'altitude': altitude,
      'ativo': ativo=='true'
    }
    return this.http.post<Armazem>(this.armazemUrl,body,{observe: 'response'}).pipe(map(data => {
      return data
  }));
  }

  atualizaAtividadeArmazem(armazem: Armazem){
    const body = {
      'id': armazem.id,
      'designacao': armazem.designacao,
      'endereco': armazem.endereco,
      'longitude': armazem.longitude,
      'latitude': armazem.latitude,
      'altitude': armazem.altitude,
      'ativo': !(armazem.ativo)
    }
    const url = this.armazemUrl+armazem.id;
    return this.http.put<Armazem>(url,body,{ observe: 'response' }).pipe(
      catchError(this.handleError)
    );
  }

  getArmazemPorDesignacaoOuId(designacao: string){
    return this.http.get<Armazem>(this.armazemUrl+`${designacao}`).pipe(
      catchError(this.handleError));
  }

  getConfigResponse(): Observable<HttpResponse<Armazem>> {
    return this.http.get<Armazem>(
      this.armazemUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.status);
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