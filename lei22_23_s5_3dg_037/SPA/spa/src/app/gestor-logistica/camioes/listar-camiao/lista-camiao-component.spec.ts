import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListaCamiao} from './lista-camiao.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { CamiaoService } from '../criar-camiao/camiao_service';
import {of} from "rxjs";

describe('lista-camiao.component', () => {
  let component: ListaCamiao;
  let fixture: ComponentFixture<ListaCamiao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaCamiao],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaCamiao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('cria', () => {
    expect(component).toBeTruthy();
  });

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let camiaoService: CamiaoService;
  let Camioes = [
    {
      id:"32323sasa",
      matricula: "IJ12NA",
      tara: "43",
      capacidadeCarga: "90",
      cargaBaterias: "87",
      autonomia:"41",
      tempoCarregamento: "41"
   }, {
      id:"32323sasa",
      matricula: "IJ12NA",
      tara: "43",
      capacidadeCarga: "90",
      cargaBaterias: "87",
      autonomia:"41",
      tempoCarregamento: "41"
   },
  ]
  beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      camiaoService = new CamiaoService((httpClientSpy));
  });

   describe('getCamioes()',() => {
     it('deve retornar os camioes', () => {
       httpClientSpy.get.and.returnValue(of(Camioes));
       camiaoService.getCamioes().subscribe({
         next: (Camioes) => {
           expect(Camioes).toEqual(Camioes);
         },
         error: () => {},
       });
       expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
     });
   });
});