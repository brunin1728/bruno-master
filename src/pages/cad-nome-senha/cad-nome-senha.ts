import { ApiProvider } from './../../providers/api/api';
import { IndiqueamigoPage } from './../indiqueamigo/indiqueamigo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-cad-nome-senha',
  templateUrl: 'cad-nome-senha.html',
  providers: [
    ApiProvider
  ]
})
export class CadNomeSenhaPage {

   public TELEFONE = localStorage.getItem('TELEFONE');
   public NOME = this.navParams.get('NOME');
   public SENHA= this.navParams.get('SENHA');
   public RETORNO: any;
   loader: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ApiProvider: ApiProvider,
    public loadingCtrl: LoadingController
  ) {
  }


  LoadingAbre() {
    this.loader = this.loadingCtrl.create({
      content: "Salvando informações..."
    });
    this.loader.present();
  }

  LoadingFecha(){
  this.loader.dismiss();
  }



salvar(nome,telefone,senha){
     //CADASTRANDO DADOS
  this.LoadingAbre();



   this.ApiProvider.salvarUsusario(nome, telefone, senha).subscribe(data=>{
    //console.log(data);
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

          this.RETORNO = objeto_retorno;



if(this.RETORNO.STATUS == '1'){
  localStorage.setItem("USUARIO", this.RETORNO.ID);

  this.navCtrl.setRoot(IndiqueamigoPage);

  this.LoadingFecha();
}else{
  this.LoadingFecha();
}

    },error=>{
      console.log(error);

      //this.showAlert("Algo deu errado...", "Por favor verifique sua internet.", "Beleza");
    }



   )
}




  avancar(){
    localStorage.setItem("NOME", this.NOME);
    localStorage.setItem("SENHA", this.SENHA);
    localStorage.setItem("ETAPA", "2");
    localStorage.setItem("ACESSO", "0");
    this.salvar(this.NOME, this.TELEFONE, this.SENHA);

  }
}
