import { SlidePage } from './../slide/slide';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-indiqueamigo',
  templateUrl: 'indiqueamigo.html',
})
export class IndiqueamigoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  compartilharFacebook(){

  }

  compartilharWhats(){

  }


  pular(){
    localStorage.setItem("ETAPA", "3");
    this.navCtrl.setRoot(SlidePage);
  }

}
