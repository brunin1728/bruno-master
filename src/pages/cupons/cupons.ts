import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import swal from 'sweetalert';
import { ApiProvider } from '../../providers/api/api';
import { DetalheCupomPage } from '../detalhe-cupom/detalhe-cupom';


@IonicPage()
@Component({
  selector: 'page-cupons',
  templateUrl: 'cupons.html',
  providers: [
    ApiProvider
  ]
})
export class CuponsPage {

  loader: any;
  public DADOS: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider
  ) {
  }


  LoadingAbre() {
    this.loader = this.loadingCtrl.create({
      content: "Verificando se existe cupons..."
    });
    this.loader.present();
  }

  LoadingFecha(){
  this.loader.dismiss();
  }

  ListaCupons(){
    //CADASTRANDO DADOS
 this.LoadingAbre();



  this.ApiProvider.cupons().subscribe(data=>{
   //console.log(data);
       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.DADOS = objeto_retorno;


console.log(this.DADOS);
this.LoadingFecha();

   },error=>{
     console.log(error);
     this.LoadingFecha();
     swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
   }



  )
}

pegarCupom(feed){
  this.navCtrl.push(DetalheCupomPage, { dados: feed});
}


ionViewDidEnter() {
  this.ListaCupons();
}

}
