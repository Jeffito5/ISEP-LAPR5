import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CriarRota } from './criar-rota.component';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RotaService } from './rota.service';

// @ts-ignore
describe('CriarRota', () => {
    let component: CriarRota;
    let fixture: ComponentFixture<CriarRota>;
    let service: RotaService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [CriarRota, RotaService]
        })
        component = TestBed.inject(CriarRota);
        service = TestBed.inject(RotaService);
    });

    it('deve criar', () => {
        expect(component).toBeTruthy();
    });
    it('deve criar a rota', inject(
        [HttpTestingController], (httpMock: HttpTestingController) => {
            const idArmazemOrigem = "M01";
            const idArmazemDestino = "M02";
            const distancia = "15.00";
            const energiaGasta = "75.00";
            const tempoMaximo = "60.0";
            const tempoExtra = "30.0";
           
            component.guardar(idArmazemOrigem, idArmazemDestino, distancia, energiaGasta, tempoMaximo, tempoExtra);
            const mockReq = httpMock.expectOne(service.rotaUrl);

            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.method).toBe('POST');
        }));
});