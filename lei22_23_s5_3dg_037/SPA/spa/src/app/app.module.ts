import { NgModule} from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarArmazem } from './gestor-armazem/armazem/criar-armazem/criar-armazem.component';
import { CriarEntrega } from './gestor-armazem/armazem/criar-entrega/criar-entrega-component';
import { CriarRota } from './gestor-logistica/rota/criar-rota/criar-rota.component';
import { ListaArmazem } from './gestor-armazem/armazem/lista-armazem/lista-armazem.component';
import { ListaEntrega } from './gestor-armazem/armazem/lista-entrega/lista-entrega-component';
import { ListaRota } from './gestor-logistica/rota/lista-rota/lista-rota.component';
import { MenuGestorArmazem } from './gestor-armazem/armazem/menu-gestor-armazem-component';
import { MenuGestorLogistica } from './gestor-logistica/menu-gestor-logistica-component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePage } from './home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { CriarCamiao } from './gestor-logistica/camioes/criar-camiao/criar-camiao.component';
import { ListaCamiao } from './gestor-logistica/camioes/listar-camiao/lista-camiao.component';
import { MenuGestorFrota } from './gestor-frota/menu-gestor-frota-component';
import { CriarPlaneamento } from './gestor-logistica/planeamento/planeamento-entregas.component';
import { RedeViaria } from './rede3d/rede-viaria-component';
import { LoginPage } from './login/login-page-component';
import { CriarUtilizador } from './criar-utilizador/criar-utilizador-component';
import { CriarPlaneamentoFrota } from './gestor-logistica/planeamento-frota/planeamento-frota-component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort'; 
import { AnonimizarUtilizador } from './anonimizar-utilizador/anonimizar-utilizador-component';
import { CommonModule } from '@angular/common';
import { ListarUtilizador } from './listar-utilizador/listar-utilizador-component';

@NgModule({
  declarations: [
    AppComponent,
    CriarArmazem,
    CriarEntrega,
    CriarRota,
    CriarCamiao,
    ListaArmazem,
    ListaEntrega,
    ListaRota,
    ListaCamiao,
    CriarPlaneamento,
    MenuGestorArmazem,
    MenuGestorLogistica,
    MenuGestorFrota,
    TopBarComponent,
    HomePage,
    RedeViaria,
    LoginPage,
    CriarUtilizador,
    AnonimizarUtilizador,
    CriarPlaneamentoFrota,
    ListarUtilizador
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    CommonModule,
    SocialLoginModule,
    AppRoutingModule, 
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSortModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginPage },
      { path: 'home-page', component: HomePage},
      { path: 'menu-gestor-armazem', component: MenuGestorArmazem },
      { path: 'menu-gestor-logistica', component: MenuGestorLogistica },
      { path: 'menu-gestor-frota', component: MenuGestorFrota},
      { path: 'criar-armazem', component: CriarArmazem },
      { path: 'criar-entrega', component: CriarEntrega },
      { path: 'criar-rota', component: CriarRota },
      { path: 'criar-camiao',component:CriarCamiao},
      { path: 'lista-armazem', component: ListaArmazem },
      { path: 'lista-entrega', component: ListaEntrega },
      { path: 'lista-rota', component: ListaRota },
      { path: 'lista-camiao',component: ListaCamiao},
      { path: 'criar-planeamento', component: CriarPlaneamento},
      { path: 'rede-viaria', component: RedeViaria},
      { path: 'criar-utilizador', component: CriarUtilizador},
      { path: 'anonimizar-utilizador', component: AnonimizarUtilizador},
      { path: 'criar-planeamento-frota', component: CriarPlaneamentoFrota},
      { path: 'criar-planeamento-frota', component: CriarPlaneamentoFrota},
      { path: 'listar-utilizador', component: ListarUtilizador}
    ])
  ],
  providers: [
    Title,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
             '954920414189-0hhf98lvbr00dvrenjkq6bctr4b35l0j.apps.googleusercontent.com'            )
          },

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
