import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { CriarCamiao } from './criar-camiao.component';

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

import { CamiaoService } from './camiao_service';

// @ts-ignore
describe('CriarCamiaoComp', () => {
  let component: CriarCamiao;
  let fixture: ComponentFixture<CriarCamiao>;
  let service: CamiaoService;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CriarCamiao,CamiaoService]
    })
    component = TestBed.inject(CriarCamiao);
    service = TestBed.inject(CamiaoService);
  });

  it('criação', () => {
    expect(component).toBeTruthy();
  });
  it('criação de camiao', inject(
    [HttpTestingController], (httpMock: HttpTestingController) => {
      
      const matricula=	"BN63NH";
      const tara = "30";
      const capacidadeCarga = "300";
      const cargaBaterias = "15";
      const autonomia = "17";
      const TempoCarregamento= "17";
      //service.addTruck({designation,tara,cargoCapacity,maxBattery,autonomy,chargingTime} as unknown as Truck).subscribe(t =>  truck = t);
      component.guardar(matricula, tara, capacidadeCarga, cargaBaterias, autonomia, TempoCarregamento);
      const mockReq = httpMock.expectOne(service.camiaoUrl);


      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toBe('POST');
    }));
});