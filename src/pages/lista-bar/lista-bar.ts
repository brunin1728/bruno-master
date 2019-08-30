import { DetalhePage } from './../detalhe/detalhe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-lista-bar',
  templateUrl: 'lista-bar.html',
  providers: [
    ApiProvider
  ]
})
export class ListaBarPage {
  public listafeed = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;


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

ionViewDidEnter(){
  this.carregarFeed();
}

doRefresh(refresher) {
  this.refresher = refresher;
  this.isRefreshing = true;

  this.carregarFeed();
}

doInfinite(infiniteScroll) {
  this.page++;
  this.infiniteScroll = infiniteScroll;
  this.carregarFeed(true);

}

  carregarFeed(newpage: boolean = false){

    this.AbreCarregando();
   this.ApiProvider.ListaBares().subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      if(newpage){
       this.listafeed =this.listafeed.concat(objeto_retorno.EMPRESAS);

       this.infiniteScroll.complete();
      }else{
        this.listafeed = objeto_retorno.EMPRESAS;
      }

  //console.log(objeto_retorno.EMPRESAS);


     this.FechaCarregando();
     if(this.isRefreshing){
       this.refresher.complete();
       this.isRefreshing = false;
     }

  },error=>{
    console.log(error);
    this.FechaCarregando();
    if(this.isRefreshing){
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

  )
  }









detalhe(id){
  console.log(id);

  this.navCtrl.push(DetalhePage, { id: id});
}


}
