import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-detalhe',
  templateUrl: 'detalhe.html',
  providers: [
    ApiProvider
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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider
    ) {
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


  ionViewDidEnter() {
    this.AbreCarregando();
    this.feedid = this.navParams.get("id");
console.log(this.feedid);


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

      }, error =>{
         console.log(error);
      }
    )
    this.FechaCarregando();
  }

}
