import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-gera-qr',
  templateUrl: 'gera-qr.html',
})
export class GeraQrPage {

   public CODDE: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidEnter() {
    this.CODDE = this.navParams.get("dados");

  }

}
