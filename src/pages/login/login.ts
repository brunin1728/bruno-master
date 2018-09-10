import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public TELEFONE = this.navParams.get('TELEFONE');
  public SENHA = this.navParams.get('SENHA');
  public loader: any;
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
      content: "Carregando informações..."
    });
    this.loader.present();
  }

  LoadingFecha(){
  this.loader.dismiss();
  }


  login() {





      //CADASTRANDO DADOS
     this.LoadingAbre();



     this.ApiProvider.VerificarUsuario(this.TELEFONE, this.SENHA).subscribe(data=>{
      //console.log(data);
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);

            this.DADOS = objeto_retorno;


    console.log(this.DADOS);

if(this.DADOS.STATUS == '1'){
  localStorage.setItem("TELEFONE", this.DADOS.TELEFONE);
  localStorage.setItem("NOME", this.DADOS.NOME);
  localStorage.setItem("USUARIO", this.DADOS.ID);
  localStorage.setItem("ETAPA", "4");
  window.location.reload();

}else{
  swal("Usuário ou senha incorreto!", "Tente novamente ou resete sua senha.", "error");
}


    this.LoadingFecha();

      },error=>{
        console.log(error);
        this.LoadingFecha();
        swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
      }



     )






  }

}
