import { ProgramacaoPage } from './../pages/programacao/programacao';
import { ConfigPage } from './../pages/config/config';
import { CuponsPage } from './../pages/cupons/cupons';
import { InicioPage } from './../pages/inicio/inicio';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CadTelPage } from '../pages/cad-tel/cad-tel';
import { CadNomeSenhaPage } from '../pages/cad-nome-senha/cad-nome-senha';
import { IndiqueamigoPage } from '../pages/indiqueamigo/indiqueamigo';
import { SlidePage } from '../pages/slide/slide';
import { PerfilPage } from '../pages/perfil/perfil';
import { ListaBarPage } from '../pages/lista-bar/lista-bar';
import { ApiProvider } from '../providers/api/api';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { MeusCuponsPage } from '../pages/meus-cupons/meus-cupons';



@Component({
  templateUrl: 'app.html',
  providers: [
    ApiProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private IF_ETAPA = localStorage.getItem('ETAPA') ? localStorage.getItem('ETAPA').length : null;
  private MODO1 = localStorage.getItem('MODO') ? localStorage.getItem('MODO').length : null;
  private ETAPA: any;
  public NOME: any;
  public FOTO_PERFIL: any;


  rootPage: any;

  pages: Array<{title: string, component: any}>;




etapas(){

  this.NOME = localStorage.getItem('NOME');
  this.FOTO_PERFIL = localStorage.getItem('FOTO');
  this.ETAPA = localStorage.getItem('ETAPA');

  if(this.MODO1 == null){
    localStorage.setItem('MODO', '1');
  }

  if(this.IF_ETAPA == null){
     this.rootPage = InicioPage;
  }else{
     if(this.ETAPA == '1'){
    this.rootPage = CadNomeSenhaPage;
  }else if(this.ETAPA == '2'){
    this.rootPage = IndiqueamigoPage;
  }else if(this.ETAPA == '3'){
    this.rootPage = SlidePage;
  }else if(this.ETAPA == '4'){
    this.rootPage = HomePage;
  }

  }

}


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public ApiProvider: ApiProvider,
    private backgroundGeolocation: BackgroundGeolocation
  ) {

    this.etapas();
    this.initializeApp();


    this.pages = [
      { title: 'Início', component: HomePage },
      { title: 'Programação', component: ProgramacaoPage },
      { title: 'Perfil', component: PerfilPage },
      { title: 'Lista Bares', component: ListaBarPage },
      { title: 'Loja', component: MeusCuponsPage },
      { title: 'Configuração', component: ConfigPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });





  }

  openPage(page) {

    this.nav.setRoot(page.component);

  }
}
