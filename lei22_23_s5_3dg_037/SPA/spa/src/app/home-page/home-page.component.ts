import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import config from '../../../config';
import { UserService, User } from '../user.service';
import { catchError, retry, map } from 'rxjs/operators';

@Component({
    selector: 'app-armazem-criar',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    providers:[Title, UserService]
  })
export class HomePage implements OnInit{
    constructor(private router: Router, private title:Title, private http: HttpClient, private userService:UserService){
    }

    logoutUrl = config.moduloLogistica.hostLogOut;

    ngOnInit(): void{
      this.title.setTitle('Home Page');
    }

    goToGestorMenuPage() :void {
        this.router.navigate(['menu-gestor-armazem']);
    }

    goToGestorMenuPageLogistica() :void {
        this.router.navigate(['menu-gestor-logistica']);
    }

    goToGestorMenuRede3DViaria(){
      this.router.navigate(['rede-viaria']);
    }
    
    goToGestorMenuPageFrota() :void
    {
    this.router.navigate(['menu-gestor-frota']);
    }

    goToCriarUtilizadorMenuPage() :void
    {
    this.router.navigate(['criar-utilizador']);
    }
    
    goToAnonimizarUtilizadorMenuPage() :void
    {
    this.router.navigate(['anonimizar-utilizador']);
    }

    goToListarUtilizadorMenuPage() :void
    {
    this.router.navigate(['listar-utilizador']);
    }

  logout(): void {
    this.http.post<User>(this.logoutUrl, { observe: 'response' }).pipe();
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