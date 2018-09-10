import { CadTelPage } from './../cad-tel/cad-tel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false, 'myMenu');
  }

CadTelefone(){
  this.navCtrl.push(CadTelPage);


}

CadFacebook(){

}

Entrar(){
  this.navCtrl.push(LoginPage);
}



  ionViewDidEnter() {

  }

}
