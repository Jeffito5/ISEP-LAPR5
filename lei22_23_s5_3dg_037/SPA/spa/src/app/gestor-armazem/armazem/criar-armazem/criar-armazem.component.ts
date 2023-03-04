import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ArmazemService } from './armazem.service';


@Component({
    selector: 'app-armazem-criar',
    templateUrl: './criar-armazem.component.html',
    providers: [ArmazemService, Title],
    styleUrls: ['./criar-armazem.component.css'],
    //styles: ['.error { color: #b30000; }'],

  })
export class CriarArmazem implements OnInit {
  error: any;

  constructor(private router: Router, private armazemService: ArmazemService, private title:Title){
  }

  ngOnInit() {
    this.title.setTitle("Criar Armazém")
  }

  guardar(id: string,designacao: string,endereco: string,longitude: string, latitude: string,altitude: string,ativo: string): void{
    this.armazemService.adicionarArmazem(id,designacao,endereco,longitude,latitude,altitude,ativo).subscribe(data =>{
      if(data.status==201||data.status==200){
        window.alert("O armazém foi criado");
      }else{
        window.alert("Algo deu errado");
      }
    });
    
  }

  cancelar(): void{
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