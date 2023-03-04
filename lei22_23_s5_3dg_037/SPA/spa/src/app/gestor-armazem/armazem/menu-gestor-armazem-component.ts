import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-armazem-redirect',
    templateUrl: './menu-gestor-armazem-component.html',
    styleUrls: ['./menu-gestor-armazem-component.css'],
    providers:[Title]
  })

  export class MenuGestorArmazem implements OnInit{
    constructor(private router: Router, private title:Title){
    }

    ngOnInit(): void{
      this.title.setTitle('Menu Gestor Armazém');
    }

    goToGestorMenuCriarArmazem() :void {
        this.router.navigate(['criar-armazem']);
    }

    goToGestorMenuCriarEntrega() :void {
      this.router.navigate(['criar-entrega']);
    }

    goToHomePage() :void {
      this.router.navigate(['home-page']);
    }

    goToGestorMenuListarArmazem() :void {
      this.router.navigate(['lista-armazem']);
    }

    goToGestorMenuListarEntrega() :void {
      this.router.navigate(['lista-entrega']);
    }

    logout() :void {
      this.router.navigate(['']);
    }

    clicked = false;

    switch() {
      this.clicked = !this.clicked;
    }

    getBackgroundColor(): string {
      if (this.clicked) {
        return '#4c5d6e';
      }

      return '#fff';
    }
  }
