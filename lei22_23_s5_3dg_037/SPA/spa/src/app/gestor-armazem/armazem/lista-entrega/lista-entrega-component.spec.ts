import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEntrega } from './lista-entrega-component';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { EntregaService } from '../criar-entrega/entrega-service';
import { of } from "rxjs";

describe('ListarEntrega', () => {
    let component: ListaEntrega;
    let fixture: ComponentFixture<ListaEntrega>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListaEntrega],
            providers: [HttpClient, HttpHandler]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListaEntrega);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar', () => {
        expect(component).toBeTruthy();
    });

    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let entregaService: EntregaService;
    let ENTREGAS = [
        {
            id: "1",
            dataEntrega: "24/02/2001",
            massaEntrega: 10,
            tempoColocarEntrega: 15,
            tempoRetirarEntrega: 15,
            armazemId: "M03"
        // }, {
        //     id: "2",
        //     dataEntrega: "24/02/2002",
        //     massaEntrega: 15,
        //     tempoColocarEntrega: 20,
        //     tempoRetirarEntrega: 25,
        //     armazemId: "M05"
         },
    ]
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        entregaService = new EntregaService((httpClientSpy));
    });

    describe('getEntregas()', () => {
        it('deve retornar todas as entregas', () => {
            httpClientSpy.get.and.returnValue(of(ENTREGAS));
            entregaService.getEntregas().subscribe({
                next: (entregas) => {
                    expect(entregas).toEqual(ENTREGAS[0]);
                },
                error: () => { },
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });
});