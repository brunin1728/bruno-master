import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, IonicModule } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StarRating } from 'ionic3-star-rating';
import { CommonModule } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular';




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

  public NOME: any;
  public DESCRICAO: any;
  public ENDERECO: any;
  public LOGO: any;
  public LATITUDE: any;
  public LONGITUDE: any;
  public ID: any;
  public IMAGEM: any;
  public NOTA: any;


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

compartilhar(){

  console.log("teste");

  this.socialSharing.share("Partiu? Entre no app e saiba mais detalhes.", this.NOME, this.IMAGEM, 'http://bom.bar/').then(() => {
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


        this.NOME = this.feed.NOME;
        this.DESCRICAO = this.feed.DESCRICAO;
        this.ENDERECO = this.feed.ENDERECO;
        this.LOGO = this.feed.LOGO;
        this.LATITUDE = this.feed.LATITUDE;
        this.LONGITUDE = this.feed.LONGITUDE;
        this.ID = this.feed.ID_EMP;
        this.NOTA = this.feed.NOTA;
        this.IMAGEM = this.feed.IMAGEM;
console.log(this.NOTA);


      }, error =>{
         console.log(error);
      }
    )
    this.FechaCarregando();
  }

}
