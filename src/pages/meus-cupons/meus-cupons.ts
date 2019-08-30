import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetalheCupomPage } from '../detalhe-cupom/detalhe-cupom';
import { GeraQrPage } from '../gera-qr/gera-qr';
import swal from 'sweetalert';


@IonicPage()
@Component({
  selector: 'page-meus-cupons',
  templateUrl: 'meus-cupons.html',
  providers: [
    ApiProvider
  ]
})
export class MeusCuponsPage {
  loader: any;
  public DADOS: any;
  public DADOSL: any;
  public DADOSU: any;
  cupom: string = "0";
  isAndroid: boolean = false;


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

  ListaCuponsLoja(){
    //CADASTRANDO DADOS
 this.LoadingAbre();



  this.ApiProvider.cupons().subscribe(data=>{
   //console.log(data);
       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.DADOSL = objeto_retorno;

console.log(this.DADOSL);

this.LoadingFecha();

   },error=>{
     console.log(error);
     this.LoadingFecha();
     swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
   }



  )
}

pegarCupomLoja(feed){
  this.navCtrl.push(DetalheCupomPage, { dados: feed});
}



  ListaCupons(){
    //CADASTRANDO DADOS
 //this.LoadingAbre();



  this.ApiProvider.MeusCupons().subscribe(data=>{
   //console.log(data);
       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.DADOS = objeto_retorno.CUPOM;
         this.DADOSU = objeto_retorno.CUPOMU;


console.log(this.DADOS);
//this.LoadingFecha();

   },error=>{
     console.log(error);
     //this.LoadingFecha();
     swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
   }



  )
}

pegarCupom(feed){
  this.navCtrl.push(GeraQrPage, { dados: feed});
}


ionViewDidEnter() {
  this.ListaCupons();
  this.ListaCuponsLoja();
}

}
