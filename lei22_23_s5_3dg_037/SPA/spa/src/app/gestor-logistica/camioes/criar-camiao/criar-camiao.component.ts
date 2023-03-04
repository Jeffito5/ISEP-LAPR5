import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camiao, CamiaoService } from './camiao_service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-camiao-criar',
    templateUrl: './criar-camiao.component.html',
    providers: [CamiaoService,Title],
    styleUrls: ['./criar-camiao.component.css'],
    //styles: ['.error { color: #b30000; }'],

  })
export class CriarCamiao implements OnInit{
  camiao:  Camiao| undefined;
  error: any;

  constructor(private router: Router,private title:Title, private camiaoService: CamiaoService){
  }

  ngOnInit(): void{
    this.title.setTitle('Criar Camião');
  }

  mostrarCamioes(){
    this.camiaoService.getCamioes().subscribe({
      next: (data: Camiao) => this.camiao ={...data}, error: error=> this.error=error,
    });
  }

  guardar(matricula: string,tara: string,capacidadeCarga: string,cargaBaterias: string, autonomia: string,tempoCarregamento: string): void{
    this.camiaoService.adicionarCamiao(matricula,tara,capacidadeCarga,cargaBaterias,autonomia,tempoCarregamento).subscribe();
    
  }

  cancelar(): void{
    this.router.navigate(['menu-gestor-frota']);
  }


  
}