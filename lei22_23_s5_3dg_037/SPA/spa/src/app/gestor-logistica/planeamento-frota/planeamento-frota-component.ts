import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Entrega, EntregaService } from 'src/app/gestor-armazem/armazem/criar-entrega/entrega-service';
import { CamiaoService,Camiao } from '../camioes/criar-camiao/camiao_service';
import { PlaneamentoFrotaService, Planeamento } from './planeamento-frota-service';
import config from '../../../../config';

@Component({
    selector: 'app-criar-planeamento-frota',
    templateUrl: './planeamento-frota-component.html',
    styleUrls: ['./planeamento-frota-component.css'],
    providers: [Title,CamiaoService,PlaneamentoFrotaService]
  })
export class CriarPlaneamentoFrota implements OnInit{
    camioes: Camiao[]=[];
    entregas: Entrega[]=[];
    planeamento: Planeamento[]=[];
    constructor(private router:Router, private title:Title, private camioesService:CamiaoService/*, private planeamentoService:PlaneamentoService*/, private http: HttpClient){
    }
    planeamentoUrl=config.moduloLogistica.hostPlaneamento;

    ngOnInit(): void{
        this.title.setTitle('Planeamento Automático');
        this.getCamioes();
    }

    getCamioes(){
        this.camioesService.getCamioes().subscribe({
            next: (data: Camiao) => this.camioes= this.camioes.concat(data)
        });
    }

    // async criarPlaneamento(camiaoId:string,dataEntrega:string,idOption:string){
    //     dataEntrega = dataEntrega.replace(/-/g,'');

    //     this.http.get<Planeamento>(this.planeamentoUrl+"criar_frota?diaEntrega="+`${dataEntrega}`+"&idCamiao="+`${camiaoId}`+"&opIndex="+`${idOption}`).subscribe(data=>{
    //         console.log('asdasd' + data.listaFinal);
    //         var text = document.getElementById("display-planeamento");
    //         let presentation="";
    //         for(let i=0;i<data.listaFinal.length;i++){
    //             presentation+="-->"+data.listaFinal[i];
    //         }

    //         presentation+= "\n Custo Total: "+data.custoCaminho;
    //         if(text!=null){
    //             text.innerText=presentation;
    //         }
    //       });
    // }

    cancelar(): void{
        this.router.navigate(['menu-gestor-logistica']);
    }
}