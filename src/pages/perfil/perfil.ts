import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';
import { InicioPage } from '../inicio/inicio';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers: [
    ApiProvider
  ]
})
export class PerfilPage {

  loader: any;
  public PONTOS: any;
  public CUPONS: any;
  public FOTO: any;
  public NOME: any = localStorage.getItem("NOME");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider
  ) {
  }


  LoadingAbre() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando informações..."
    });
    this.loader.present();
  }

  LoadingFecha(){
  this.loader.dismiss();
  }


sair(){
  this.navCtrl.setRoot(InicioPage);
}


DadosUsuario(){
  //CADASTRANDO DADOS
 this.LoadingAbre();



 this.ApiProvider.MeusPontos().subscribe(data=>{
  //console.log(data);
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.PONTOS = objeto_retorno.TOTAL;
        this.FOTO = objeto_retorno.FOTO;


console.log(this.FOTO);
this.LoadingFecha();

  },error=>{
    console.log(error);
    this.LoadingFecha();
    swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
  }



 )
}

CuponsUsuario(){



 this.ApiProvider.MeusCupons().subscribe(data=>{
  //console.log(data);
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.CUPONS = objeto_retorno.CUPOM;


if(this.CUPONS[0]['IMAGEM'] == null){
  this.CUPONS = 0;
}



  },error=>{
    console.log(error);

  }



 )
}





  ionViewDidEnter() {

    this.CuponsUsuario();
    this.DadosUsuario();
  }

}
