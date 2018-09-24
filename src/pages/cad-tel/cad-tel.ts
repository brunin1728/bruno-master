import { CadNomeSenhaPage } from './../cad-nome-senha/cad-nome-senha';
import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';

@NgModule({
  imports: [
    BrMaskerModule
  ],
})

@IonicPage()
@Component({
  selector: 'page-cad-tel',
  templateUrl: 'cad-tel.html',
})

export class CadTelPage {

   public TELEFONE = this.navParams.get('TELEFONE');
   loader: any;
   public RETORNO: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider
  ) {
  }


  LoadingAbre() {
    this.loader = this.loadingCtrl.create({
      content: "Verificando telefone..."
    });
    this.loader.present();
  }

  LoadingFecha(){
  this.loader.dismiss();
  }


  salvar(telefone){
    //CADASTRANDO DADOS
 this.LoadingAbre();



  this.ApiProvider.VerificaTel(telefone).subscribe(data=>{
   //console.log(data);
       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.RETORNO = objeto_retorno.STATUS;


console.log(this.RETORNO);

if(this.RETORNO == '1'){

 this.LoadingFecha();
 swal({
  title: "Alguma coisa deu errado!",
  text: "Já existe um cadastro para este número.",
  icon: "error",
  timer: 3000,
});

}else{

 localStorage.setItem("ETAPA", "1");
 localStorage.setItem("TELEFONE", this.TELEFONE);
 this.navCtrl.setRoot(CadNomeSenhaPage);
 this.LoadingFecha();

}

   },error=>{
     console.log(error);

     //this.showAlert("Algo deu errado...", "Por favor verifique sua internet.", "Beleza");
   }



  )
}
  avancar(){
    this.salvar(this.TELEFONE);
  }
}
