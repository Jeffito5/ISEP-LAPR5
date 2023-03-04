import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Entrega, EntregaService } from 'src/app/gestor-armazem/armazem/criar-entrega/entrega-service';
import { CamiaoService,Camiao } from '../camioes/criar-camiao/camiao_service';
import { Planeamento, PlaneamentoService } from './planemento-service';
import config from '../../../../config';

@Component({
    selector: 'app-criar-planeamento',
    templateUrl: './planeamento-entregas.component.html',
    styleUrls: ['./planeamento-entregas.component.css'],
    providers: [Title,CamiaoService,EntregaService]
  })
export class CriarPlaneamento implements OnInit{
    camioes: Camiao[]=[];
    planeamentoList: Planeamento[]=[];
    planeamento: Planeamento|undefined;
    entregas: Entrega[]=[];
    
    constructor(private router:Router, private title:Title, private camioesService:CamiaoService, private entregaService:EntregaService, private http: HttpClient){
 //       this.planeamento=[];
    }
    planeamentoUrl=config.moduloLogistica.hostPlaneamento;
    entregaUrl=config.moduloArmazem.hostEntrega;

    ngOnInit(): void{
        this.title.setTitle('Planeamento Automático');
        this.getCamioes();
    }

    getCamioes(){
        this.camioesService.getCamioes().subscribe({
            next: (data: Camiao) => this.camioes= this.camioes.concat(data)
        });
    }

    async criarPlaneamentoTeste(camiaoId:string,dataEntrega:string,idOption:string){
        dataEntrega = dataEntrega.replace(/-/g,'');

        this.http.get<Planeamento>(this.planeamentoUrl+"criar_frota?diaEntrega="+`${dataEntrega}`+"&idCamiao="+`${camiaoId}`+"&opIndex="+`${idOption}`).subscribe(data=>{
            var listaAux: any[] = [];
            var listaAux2: any[] = [];
            for(let i=0;i<data.listaFinal.length;i++){
                listaAux[i]=data.listaFinal[i];
            }
            this.planeamentoList = listaAux; 
          });
    }

    async criarPlaneamento(camiaoId:string,dataEntrega:string,idOption:string){
        dataEntrega = dataEntrega.replace(/-/g,'');

        this.http.get<Planeamento>(this.planeamentoUrl+"criar_frota?diaEntrega="+`${dataEntrega}`+"&idCamiao="+`${camiaoId}`+"&opIndex="+`${idOption}`).subscribe(data=>{
            console.log('asdasd' + data.listaFinal);
            var text = document.getElementById("display-planeamento");
            let presentation="";
            for(let i=0;i<data.listaFinal.length;i++){
                presentation+="-->"+data.listaFinal[i];
                this.http.get<Entrega>(this.entregaUrl+`${data.listaFinal[i]}`).subscribe(data1=>{
                    this.entregas[i]=data1
                });
            }

            presentation+= "\n Custo Total: "+data.custoCaminho;
            if(text!=null){
                text.innerText=presentation;
            }
          });
    }

    cancelar(): void{
        this.router.navigate(['menu-gestor-logistica']);
    }
}