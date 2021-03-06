import { CadtelefonefacePage } from './../pages/cadtelefoneface/cadtelefoneface';
import { ProgramacaofilterPage } from './../pages/programacaofilter/programacaofilter';
import { ProgramacaoPage } from './../pages/programacao/programacao';
import { ConfigPage } from './../pages/config/config';
import { DetalhePage } from './../pages/detalhe/detalhe';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Slide } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PerfilPage } from './../pages/perfil/perfil';
import { LoginPage } from './../pages/login/login';
import { ListaBarPage } from './../pages/lista-bar/lista-bar';
import { InicioPage } from './../pages/inicio/inicio';
import { IndiqueamigoPage } from './../pages/indiqueamigo/indiqueamigo';
import { CadTelPage } from './../pages/cad-tel/cad-tel';
import { CadNomeSenhaPage } from './../pages/cad-nome-senha/cad-nome-senha';
import { SlidePage } from '../pages/slide/slide';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DadosProvider } from '../providers/dados/dados';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { CuponsPage } from '../pages/cupons/cupons';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';
import { DetalheCupomPage } from '../pages/detalhe-cupom/detalhe-cupom';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { MeusCuponsPage } from '../pages/meus-cupons/meus-cupons';
import { GeraQrPage } from '../pages/gera-qr/gera-qr';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StarRatingModule } from 'ionic3-star-rating';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DetalheprogramacaoPage } from '../pages/detalheprogramacao/detalheprogramacao';
import { Facebook } from '@ionic-native/facebook';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CadNomeSenhaPage,
    CadTelPage,
    IndiqueamigoPage,
    InicioPage,
    ListaBarPage,
    LoginPage,
    PerfilPage,
    SlidePage,
    CuponsPage,
    DetalhePage,
    DetalheCupomPage,
    MeusCuponsPage,
    GeraQrPage,
    ConfigPage,
    ProgramacaoPage,
    ProgramacaofilterPage,
    DetalheprogramacaoPage,
    CadtelefonefacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    BrMaskerModule,
    HttpModule,
    NgxQRCodeModule,
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CadNomeSenhaPage,
    CadTelPage,
    IndiqueamigoPage,
    InicioPage,
    ListaBarPage,
    LoginPage,
    PerfilPage,
    SlidePage,
    CuponsPage,
    DetalhePage,
    DetalheCupomPage,
    MeusCuponsPage,
    GeraQrPage,
    ConfigPage,
    ProgramacaoPage,
    ProgramacaofilterPage,
    DetalheprogramacaoPage,
    CadtelefonefacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DadosProvider,
    ApiProvider,
    BackgroundGeolocation,
    Geolocation,
    LocalNotifications,
    InAppBrowser,
    SocialSharing,
    Facebook
  ]
})
export class AppModule {}
