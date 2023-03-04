import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { of } from "rxjs";
import { ListaRota } from './lista-rota.component';
import { RotaService } from '../criar-rota/rota.service';

describe('ListarRota', () => {
    let component: ListaRota;
    let fixture: ComponentFixture<ListaRota>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListaRota],
            providers: [HttpClient, HttpHandler]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListaRota);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar', () => {
        expect(component).toBeTruthy();
    });

    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let rotaService: RotaService;
    let Rotas = [
        {   
            idArmazemOrigem: "M01",
            idArmazemDestino: "M02",
            distancia: "15.00",
            energiaGasta: "75.00",
            tempoMaximo: "60.0",
            tempoExtra: "30.0"
        }, {
            idArmazemOrigem: "M03",
            idArmazemDestino: "M04",
            distancia: "33.00",
            energiaGasta: "100.00",
            tempoMaximo: "90.0",
            tempoExtra: "45.0"
        },
    ]
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        rotaService = new RotaService((httpClientSpy));
    });

    describe('getRotas()', () => {
        it('deve retornar todas as rotas', () => {
            httpClientSpy.get.and.returnValue(of(Rotas));
            rotaService.getRotas().subscribe({
                next: (Rotas) => {
                    expect(Rotas).toEqual(Rotas);
                },
                error: () => { },
            });
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });
});