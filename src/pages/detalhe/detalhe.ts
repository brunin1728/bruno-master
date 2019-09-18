import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, IonicModule } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StarRating } from 'ionic3-star-rating';
import { CommonModule } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';
import { DetalheprogramacaoPage } from '../detalheprogramacao/detalheprogramacao';




@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
  providers: [
    ApiProvider
  ]
})


@NgModule({
  declarations: [ StarRating ],
  exports: [ StarRating ],
  imports: [
    CommonModule, IonicModule
  ]
})


export class DetalhePage {


  public loader;
  public feedid: any;
  public feed: any;
  public pro: any;

  public NOME: any;
  public DESCRICAO: any;
  public ENDERECO: any;
  public LOGO: any;
  public LATITUDE: any;
  public LONGITUDE: any;
  public ID: any;
  public IMAGEM: any;
  public NOTA: any;
  public status: any = 0;
  public RETORNO1: any;
  public FAV: any;
  public FOTOS: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController
    ) {
  }

mapa(){
  let location = "geo:?q=" + this.LATITUDE + "," + this.LONGITUDE;
  console.log(location);

  const browser = this.iab.create(location, '_system');
}

addfavorito(){
  this.feedid = this.navParams.get("id");



  this.ApiProvider.favorito(this.feedid).subscribe(
    data=>{
      let retorno = (data as any)._body;
      this.RETORNO1 = JSON.parse(retorno);


      if(this.RETORNO1.STATUS == '1'){
          this.FAV = 1;
      }else{
        this.FAV = 2;
      }
console.log(this.RETORNO1);

    }, error =>{
       console.log(error);
    }
  )

}

addnota(n){
  this.feedid = this.navParams.get("id");



  this.ApiProvider.nota(this.feedid,n).subscribe(
    data=>{
      let retorno = (data as any)._body;
      this.RETORNO1 = JSON.parse(retorno);


      if(this.RETORNO1.STATUS == '1'){

      }else{

      }


    }, error =>{
       console.log(error);
    }
  )

}

logRatingChange(rating) {
//DAR NOTA AO BAR

}


  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

FechaCarregando(){
  this.loader.dismiss();
}

telefone(){



}




verevento(id){
  this.navCtrl.push(DetalheprogramacaoPage, { id: id});
}





compartilhar(){

let img = 'https://bom.bar/app/images/empresas/fotos/' + this.IMAGEM;

  this.socialSharing.shareViaWhatsApp(this.NOME, img, 'http://bom.bar/').then(() => {
    // Success!
  }).catch(() => {
    // Error!
  });



}

  ionViewDidEnter() {
    this.AbreCarregando();
    this.feedid = this.navParams.get("id");



    this.ApiProvider.DetalhesBar(this.feedid).subscribe(
      data=>{
        let retorno = (data as any)._body;
        this.feed = JSON.parse(retorno);

        this.pro = this.feed.PRO;
        this.FOTOS = this.feed.FOTOS;
        this.feed = this.feed.EMPRESAS[0];


        this.NOME = this.feed.NOME;
        this.DESCRICAO = this.feed.DESCRICAO;
        this.ENDERECO = this.feed.ENDERECO;
        this.LOGO = this.feed.LOGO;
        this.LATITUDE = this.feed.LATITUDE;
        this.LONGITUDE = this.feed.LONGITUDE;
        this.ID = this.feed.ID_EMP;
        this.NOTA = this.feed.NOTA;
        this.FAV = this.feed.FAVORITO;
        this.IMAGEM = this.feed.IMAGEM;
console.log(this.feed);

if(this.pro == undefined){
this.status = 1;
}else{
  this.status = 2;
}

      }, error =>{
         console.log(error);
      }
    )
    this.FechaCarregando();
  }

}
