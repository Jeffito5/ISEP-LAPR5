import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from '@angular/platform-browser'

@Component({
    selector: 'app-gestor-frota-redirect',
    templateUrl: './menu-gestor-frota-component.html',
    styleUrls: ['./menu-gestor-frota-component.css'],
    providers: [Title]
  })

  export class MenuGestorFrota {
    constructor(private router: Router, private title:Title){
    }

    ngOnInit():void{
      this.title.setTitle("Menu Gestor Frotas");
    }
    
    goToGestorMenuCriarCamiao() :void {
        this.router.navigate(['criar-camiao']);
    }

    // goToGestorMenuCriarEntrega() :void {
    //   this.router.navigate(['criar-entrega']);
    // }

    goToHomePage() :void {
      this.router.navigate(['home-page']);
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

    // goToGestorMenuListarEntrega() :void {
    //   this.router.navigate(['lista-entrega']);
    // }
  }
