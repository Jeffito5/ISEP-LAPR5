import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService, User } from '../user.service';


@Component({
    selector: 'app-utilizador-anonimizar',
    templateUrl: './anonimizar-utilizador-component.html',
    providers: [Title, UserService],
    styleUrls: ['./anonimizar-utilizador-component.css'],
  })

export class AnonimizarUtilizador implements OnInit{
  emails: User[]=[];
  error: any;
  
  constructor(private router: Router, private title:Title, private userService:UserService){
    this.emails = [];
  }
  
  ngOnInit(): void{
    this.title.setTitle('Anonimizar Utilizador');
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (data: User) => this.emails=this.emails.concat(data)
    });
  }

  anonimizar(email: string): void {
    this.userService.anonimizarUser(email).subscribe();
        window.alert('O user foi anonimizado');
  }

  cancelar(): void{
    this.router.navigate(['home-page']);
  }  
}
