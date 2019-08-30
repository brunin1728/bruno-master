import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  public MODO: any = localStorage.getItem("MODO");
  public isToggled: boolean;




  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isToggled = true;
  }

 up(){
if(this.isToggled == true){
  localStorage.setItem("MODO", '1');
}else{
  localStorage.setItem("MODO", '0');
}

 }




verificar(){
  if(this.MODO == '0'){
   this.isToggled = false;
  }else{
    this.isToggled = true;
  }
}

 ionViewDidEnter() {
this.verificar();
}

}
