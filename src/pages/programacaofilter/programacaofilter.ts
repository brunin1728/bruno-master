import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import swal from 'sweetalert';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-programacaofilter',
  templateUrl: 'programacaofilter.html',
})
export class ProgramacaofilterPage {
  public DADOS: any;
  loader: any;
  public ID: any = this.navParams.get("ID");

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

ListaPro(){
    //CADASTRANDO DADOS
 //this.LoadingAbre();



  this.ApiProvider.programacao(this.ID).subscribe(data=>{
   //console.log(data);
       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.DADOS = objeto_retorno;
console.log(this.DADOS);



   },error=>{
     console.log(error);
     this.LoadingFecha();
     swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
   }



  )
}

filtrar(feed){
  this.navCtrl.push(ProgramacaofilterPage, { dados: feed});
}

  ionViewDidEnter() {
this.ListaPro();
  }


}
