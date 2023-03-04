import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { CriarEntrega } from './criar-entrega-component';
import { EntregaService } from './entrega-service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

// @ts-ignore
describe('CriarEntrega', () => {
    let component: CriarEntrega;
    let fixture: ComponentFixture<CriarEntrega>;
    let service: EntregaService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [CriarEntrega, EntregaService]
        })
        component = TestBed.inject(CriarEntrega);
        service = TestBed.inject(EntregaService);
    });

    it('deve criar', () => {
        expect(component).toBeTruthy();
    });
    it('deve criar a entrega', inject(
        [HttpTestingController], (httpMock: HttpTestingController) => {
            const dataEntrega = "24/02/2001";
            const massaEntrega = "10";
            const tempoColocarEntrega = "15";
            const tempoRetirarEntrega = "15";
            const armazemId = "M03";

            component.guardar(dataEntrega, massaEntrega, tempoColocarEntrega, tempoRetirarEntrega, armazemId);
            const mockReq = httpMock.expectOne(service.entregaUrl);

            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.method).toBe('POST');
        }));
});