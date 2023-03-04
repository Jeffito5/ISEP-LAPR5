import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import * as dataLogin from '../../assets/dados-login.json';
import { UserService, User } from '../criar-utilizador/user.service';

import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { FormGroup } from '@angular/forms';
import {CommonModule} from '@angular/common'
@Component({
  selector: 'app-login',
  templateUrl: './login-page-component.html',
  styleUrls: ['./login-page-component.css'],
  providers: [Title, UserService]
})


export class LoginPage implements OnInit {
  
 
  


  users: User[] = [];
  user:any;



  loginUserForm: FormGroup;

  constructor(private router: Router, private authService:SocialAuthService,private title: Title, private http: HttpClient, private userService:UserService,private ngZone: NgZone,private CommonModule:CommonModule) {
    this.users = [];
  }

  ngOnInit(): void {
    this.title.setTitle('Login Page');
    this.buscarUsers();
    
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      
      
     console.log(user.email);
     this.userService.getUserByEmail(user.email).subscribe((response) => {
       if (response == null) {
         console.log('User not found');
       } else {
         let user: User = response;
         console.log(user);
         console.log(user.email);
         console.log(this.getRolebyUser(user));
         this.rotearParaPagina(user.tipoUser);


       }
     });
   }); 
      // var data1: any; 
    // this.getJSON().subscribe(data=>{
    //   console.log(data);
    //   data1=data
    // });
    //console.log(this.login[0].username);
  }

  getRolebyUser(user: User) {
    console.log('Roteando para pagina de:', user.tipoUser);
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

  // public getJSON(): Observable<any> {
  //   return this.http.get("../../assets/dados-login.json");
  // }

  login(email, password): void {
    var role : string | undefined;

    if (!email && !password) {
      window.alert('É necessário inserir o email e a password');
    } else if (!password) {
      window.alert('É necessário inserir a password');
    } else if (!email) {
      window.alert('É necessário inserir o email');
    } if (email && password) {

      
      for (var val of this.users) {
        if (val.email === email) {
          role = val.tipoUser;
        }
      }

      this.userService.login(email, password).subscribe(
       
      )

      this.rotearParaPagina(role);
    }
  }


    // let bo = false;
    // for (var i in this.login) {
    //   if (email === this.login[i].username) {
    //     if (password === this.login[i].password) {
    //       bo = true;
    //       this.rotearParaPagina(this.login[i].tipoUtilizador);
    //     } else {
    //       window.alert('Password errada. Tente novamente.');
    //       var us = <HTMLInputElement>document.getElementById('username');
    //       if (us != null) {
    //         us.value = '';
    //       }
    //       var pass = <HTMLInputElement>document.getElementById('pass');
    //       if (pass != null) {
    //         pass.value = '';
    //       }
    //     }
    //   }
    // }
    // if (!bo) {
    //   window.alert('Email errado. Tente novamente.');
    //   var us = <HTMLInputElement>document.getElementById('username');
    //   if (us != null) {
    //     us.value = '';
    //   }
    //   var pass = <HTMLInputElement>document.getElementById('pass');
    //   if (pass != null) {
    //     pass.value = '';
    //   }
    // }
  

  buscarUsers() {
    this.users = [];
    this.userService.getUsers().subscribe({
      next: (data: User) => this.users = this.users.concat(data)
    });
    console.log(this.users.length);
  }



  rotearParaPagina(cargo) {
    switch (cargo) {
      case "administrador": {
        this.router.navigate(['home-page']);
        break;
      }
      case "gestor_armazem": {
        this.router.navigate(['menu-gestor-armazem']);
        break;
      }
      case "gestor_logistica": {
        this.router.navigate(['menu-gestor-logistica']);
        break;
      }
      case "gestor_frota": {
        this.router.navigate(['menu-gestor-frota']);
        break;
      }
      case "logout":{
       this.router.navigate(['home-page'])
       break;
      };
      default: {
        break;
      }
    }
  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }

  signOut(): void {
    this.authService.signOut();
   console.log('aqui chega')
  }


  public async handleGoogleAuth() {
    this.signInWithGoogle();


  }

  public async handleGoogleAuthLogout() {
    this.signOut();
    this.rotearParaPagina('logout');
    console.log('aqui tmb deve chegar')
  }

  


}