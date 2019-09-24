import { CadtelefonefacePage } from './../cadtelefoneface/cadtelefoneface';
import { CadTelPage } from './../cad-tel/cad-tel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Alert } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  public loader: any;
  public DADOS: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private fb: Facebook,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider
  ) {
    this.menuCtrl.enable(false, 'myMenu');
  }


gravarDados(telefone,nome,usuario,foto,id){

  localStorage.setItem("TELEFONE", telefone);
  localStorage.setItem("NOME", nome);
  localStorage.setItem("USUARIO", usuario);
  localStorage.setItem("ID_FACEBOOK", id);
  localStorage.setItem("FOTO", foto);
  localStorage.setItem("ETAPA", "4");
  window.location.reload();

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

login(id,name) {

  //CADASTRANDO DADOS
 this.LoadingAbre();



 this.ApiProvider.VerificarUsuarioFacebook(id,name).subscribe(data=>{
  //console.log(data);
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.DADOS = objeto_retorno;


console.log(this.DADOS);

if(this.DADOS.STATUS == '1'){
//SE ESTIVER CADASTRADO
this.gravarDados(this.DADOS.TELEFONE,this.DADOS.NOME,this.DADOS.USUARIO,this.DADOS.FOTO,this.DADOS.ID_FACEBOOK);

}else{
//SE NÃO ESTIVER CADASTRADO

this.navCtrl.setRoot(CadtelefonefacePage);

}

this.LoadingFecha();

  },error=>{
    console.log(error);
    this.LoadingFecha();
    swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
  }



 )






}




facebook(){
  this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
  .then((res: FacebookLoginResponse) => {
    let IDUSER = res.authResponse.userID;

    this.fb.api("/me?fields=id,name,gender,birthday,email", []) .then((user) => {

      // Get the connected user details
      var gender    = user.gender;
      var birthday  = user.birthday;
      var nome      = user.name;
      var email     = user.email;
      var id     = IDUSER;

      this.login(id,nome);


    })
  })
  .catch(e => console.log('Error logging into Facebook', e));

  this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

}



CadTelefone(){
  this.navCtrl.push(CadTelPage);


}


Entrar(){
  this.navCtrl.push(LoginPage);
}



  ionViewDidEnter() {

  }

}
