import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Entrega } from 'src/app/gestor-armazem/armazem/criar-entrega/entrega-service';
import config from '../../../../config';


export interface Planeamento{
    idCamiao: string,
    listaFinal: string[],
    custoCaminho: string
}

@Injectable()
export class PlaneamentoService {
    constructor(private http: HttpClient) {
    }

    planeamentoUrl=config.moduloLogistica.hostPlaneamento;

    createPlaneamento(camiaoId:string,dataEntrega:string,idOption:string){
        console.log(camiaoId);
        let argumentos="criar_frota?diaEntrega="+`${dataEntrega}`+"&idCamiao="+`${camiaoId}`+"&opIndex="+`${idOption}`;
        return this.http.get<Planeamento>(this.planeamentoUrl+argumentos).pipe(
            catchError(this.handleError)
          );
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