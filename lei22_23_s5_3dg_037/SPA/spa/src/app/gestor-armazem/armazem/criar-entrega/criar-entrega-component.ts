import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Entrega, EntregaService } from './entrega-service';
import { Armazem, ArmazemService } from '../criar-armazem/armazem.service';
import config from '../../../../../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entrega-criar',
  templateUrl: './criar-entrega-component.html',
  providers: [EntregaService, Title, ArmazemService],
  styleUrls: ['./criar-entrega-component.css'],
})

export class CriarEntrega implements OnInit {
  error: any;
  armazens: Armazem[] = [];
  armazemUrl = config.moduloArmazem.hostArmazem;

  constructor(private router: Router, private entregaService: EntregaService, private http: HttpClient, private title: Title, private armazemService: ArmazemService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Criar Entrega');
    this.getArmazensAtivos();
  }

  getArmazensAtivos() {
    var arrayAux;
    this.http.get<Armazem[]>(this.armazemUrl + 'Ativos/').subscribe(dataArmazens => {
      arrayAux = dataArmazens;
      for (var i in arrayAux) {
        if (arrayAux[i].id != "M05") {
          this.armazens.push(arrayAux[i]);
        }
      }
    });
    // this.armazemService.getArmazensAtivos().subscribe({
    //   next: (data: Armazem) => this.armazens = this.armazens.concat(data)
    // });
  }

  goToGestorMenuCriarEntrega(): void {
    this.router.navigate(['menu-gestor-armazem']);
  }

  guardar(data: string, massa: string, tempoColocarEntrega: string, tempoRetirarEntrega: string, idArmazem: string): void {
    var date = new Date(data);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      //Do something..
      window.alert("Data não pode ser inferior ao dia de hoje.");
    } else {
      data = data.replace(/-/g, '');
      //console.log(idArmazem);
      this.entregaService.adicionarEntrega(data, massa, tempoColocarEntrega, tempoRetirarEntrega, idArmazem).subscribe(data => {
        if (data.status == 201 || data.status == 200) {
          window.alert("A entrega foi criada.");
        } else {
          window.alert("Erro.");
        }
      });
    }
    //window.alert('Foi adicionada uma entrega');
  }

  cancelar(): void {
    this.router.navigate(['menu-gestor-armazem']);
  }

  //this.http.post<>();
  /*
  var theData = {'id': id, 'designacao': designacao, 'endereco': endereco,'longitude': longitude,'latitude': latitude,'altitude': altitude, 'ativo': ativo};

  var theJSON = JSON.stringify(theData);
  var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
  
  var a = document.createElement('a');
  a.href = uri;

  document.body.appendChild(a);*/

}
