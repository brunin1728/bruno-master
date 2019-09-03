import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalheprogramacao',
  templateUrl: 'detalheprogramacao.html',
})
export class DetalheprogramacaoPage {

   public DADOS: any = this.navParams.get("id");


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }






  ionViewDidEnter() {



  }

}
