import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rota, RotaService } from './rota.service';
import { ArmazemService, Armazem } from '../../../gestor-armazem/armazem/criar-armazem/armazem.service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-rota-criar',
    templateUrl: './criar-rota.component.html',
    providers: [RotaService,Title, ArmazemService],
    styleUrls: ['./criar-rota.component.css'],
  })
export class CriarRota implements OnInit{
  rota:  Rota| undefined;
  error: any;
  armazens: Armazem[]=[];

  constructor(private router: Router, private rotaService: RotaService, private title:Title, private armazemService: ArmazemService){
    this.armazens = [];
  }

  ngOnInit(): void{
    this.title.setTitle('Criar Rota');
    this.getArmazens();
  }

  getArmazens(){
    this.armazemService.getArmazens().subscribe({
      next: (data: Armazem) => this.armazens=this.armazens.concat(data)
    });
  }

  mostrarRotas(){
    this.rotaService.getRotas().subscribe({
      next: (data: Rota) => this.rota ={...data}, error: error=> this.error=error,
    });
  }

  guardar(idArmazemOrigem: string, idArmazemDestino: string, distancia: string, energiaGasta: string, tempoMaximo: string, tempoExtra: string): void {
    this.rotaService.adicionarRota(idArmazemOrigem, idArmazemDestino, distancia, energiaGasta, tempoMaximo, tempoExtra).subscribe(data => {
      if (data.status == 201 || data.status == 200) {
        window.alert('A rota foi criada');
      } else {
        window.alert("Algo deu errado");
      }
    });
  }

  cancelar(): void{
    this.router.navigate(['menu-gestor-logistica']);
  }
}