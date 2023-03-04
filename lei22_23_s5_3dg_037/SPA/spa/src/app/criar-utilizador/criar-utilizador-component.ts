import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService, User } from '../user.service';


interface UserTipo{
  id:string,
  nome:string
}

@Component({
    selector: 'app-utilizador-criar',
    templateUrl: './criar-utilizador-component.html',
    providers: [Title, UserService],
    styleUrls: ['./criar-utilizador-component.css'],
  })
export class CriarUtilizador implements OnInit{
  error: any;
  tipoUsers: UserTipo[]=[
  {id: "administrador",nome: "Administrador"}, 
  {id: "gestor_armazem",nome: "Gestor Armazem"}, 
  {id: "gestor_logistica",nome: "Gestor Logistica"}, 
  {id: "gestor_frota",nome: "Gestor Frota"}];
  
  constructor(private router: Router, private title:Title, private userService:UserService){
  }
  
  ngOnInit(): void{
    this.title.setTitle('Criar Utilizador');
  }

  guardar(nome : string, email: string, password: string, dataNascimento: string, numeroTelefone: string, tipoUser: string): void {
    this.userService.adicionarUser(nome, email, password, dataNascimento, numeroTelefone, tipoUser).subscribe();
        window.alert('O user foi criado');
      
    
  }

  cancelar(): void{
    this.router.navigate(['home-page']);
  }  
}
