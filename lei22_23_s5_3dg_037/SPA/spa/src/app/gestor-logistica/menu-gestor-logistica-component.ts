
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
@Component({
  selector: 'app-gestor-logistica-redirect',
  templateUrl: './menu-gestor-logistica-component.html',
  styleUrls: ['./menu-gestor-logistica-component.css'],
  providers: [Title]
})

export class MenuGestorLogistica {
  constructor(private router: Router, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Menu Gestor Logistica');
  }

  goToGestorMenuCriarRota(): void {
    this.router.navigate(['criar-rota']);
  }

  // goToGestorMenuCriarEntrega() :void {
  //   this.router.navigate(['criar-entrega']);
  // }

  goToHomePage(): void {
    this.router.navigate(['home-page']);
  }

  goToGestorMenuListarRota(): void {
    this.router.navigate(['lista-rota']);
  }
  goToGestorMenuListarCamiao(): void {
    this.router.navigate(['lista-camiao']);
  }

  goToCriarPlaneamento(): void {
    this.router.navigate(['criar-planeamento']);
  }

  goToCriarPlaneamentoFrota(): void {
    this.router.navigate(['criar-planeamento-frota']);
  }

  goToGestorMenuRede3DViaria(){
    this.router.navigate(['rede-viaria']);
  }

  logout(): void {
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
