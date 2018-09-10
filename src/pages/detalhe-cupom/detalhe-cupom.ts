import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-detalhe-cupom',
  templateUrl: 'detalhe-cupom.html',
  providers: [
    ApiProvider
  ]
})
export class DetalheCupomPage {
   public DADOS: any;
   public loader: any;
   public feedid: any;
   public feed: any;

   public IMAGEM: any;
   public QTD: any;
   public PONTOS: any;
   public TITULO: any;

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

trocando(id){

  this.AbreCarregando();



  this.ApiProvider.TrocarCupom(id).subscribe(data=>{
   //console.log(data);
       const response = (data as any);
       const objeto_retorno = JSON.parse(response._body);

         this.DADOS = objeto_retorno.STATUS;

if(this.DADOS == "1"){
  swal("Parabéns! Cupom adquirido com sucesso!", {
    icon: "success",
  });
}else if(this.DADOS == "0"){
  swal("Você não tem pontos para adquirir esse voucher.", {
    icon: "error",
  });
}else if(this.DADOS == "4"){
  swal("Aconteceu algo de errado, por favor tente novamente mais tarde.", {
    icon: "error",
  });
}else{
  swal("Aconteceu algo de errado, por favor tente novamente mais tarde.", {
    icon: "error",
  });
}

this.FechaCarregando();

   },error=>{
     console.log(error);
     this.FechaCarregando();
     swal("Algo deu errado...", "Por favor verifique sua internet.", "error");
   }



  )




}




  ionViewDidEnter() {

    this.AbreCarregando();
    this.feedid = this.navParams.get("dados");
    this.IMAGEM = this.feedid.IMAGEM;
    this.QTD = this.feedid.QTD;
    this.PONTOS = this.feedid.PONTOS;
    this.TITULO = this.feedid.TITULO;
    this.FechaCarregando();

  }




comprar(){
  swal({
    title: "Atenção!",
    text: "Você dedeja trocar seus pontos por esse Voucher?",
    icon: "warning",
    buttons: ["Não", "Sim"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.trocando(this.feedid.ID_CUP);
    } else {

    }
  });



}
}
