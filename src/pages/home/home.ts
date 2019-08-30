import { DetalhePage } from './../detalhe/detalhe';
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { ApiProvider } from '../../providers/api/api';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import swal from 'sweetalert';
import { LocalNotifications } from '@ionic-native/local-notifications';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ApiProvider,
    LocalNotifications
  ]
})


export class HomePage {

  @ViewChild('map') mapElement;
  map: any;
  public valor: any;
  loader: any;
  public lista: any;
  public beaches: any;
  public total: any = [];
  public prov: any;
  public LATITUDE: any;
  public LONGITUDE: any;
  public lat: any;
  public log: any;
  public retorno: any;
  public MODO: any = localStorage.getItem("MODO");

  data = { title:'', description:'', date:'', time:'' };
  private ACESSO: any = localStorage.getItem("ACESSO");

  public listafeed = new Array<any>();
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;



  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider,
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController
    ) {
      this.bemvindo();
      if(this.MODO == '0'){
        this.carregarListaBar();
      }else{
        this.geo2();
      }


  }


  detalhe(id){
    console.log(id);

    this.navCtrl.push(DetalhePage, { id: id});
  }


  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarListaBar();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarListaBar(true);

  }

    carregarListaBar(newpage: boolean = false){

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
     )}


bemvindo(){
  if(this.ACESSO === '0'){
  swal({
    title: "PARABÉNS!",
    text: "Você ganhou 10 pontos por se cadastrar!",
    icon: "success",
    timer: 3000,
  });
  localStorage.setItem("ACESSO", "1");
}
}




geo2(){
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });

   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    let late = String(data.coords.latitude);
    let longi = String(data.coords.longitude);


    this.LATITUDE = localStorage.setItem("LATITUDE", late);
    this.LONGITUDE = localStorage.setItem("LONGITUDE", longi);
    this.carregarFeed();
   });
}


geo(){

   const config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false,
    stopOnTerminate: false,
    interval: 10000
};

this.backgroundGeolocation.configure(config)
.subscribe((location: BackgroundGeolocationResponse) => {
  this.lat = location.latitude;
  this.log = location.longitude;


  //this.LATITUDE = localStorage.setItem("LATITUDE", this.lat);
 // this.LONGITUDE = localStorage.setItem("LONGITUDE", this.log);

this.carregarFeed();
this.localiza('-22.4117566','-42.9663352',this.lat,this.log);
this.backgroundGeolocation.finish();

});


this.backgroundGeolocation.start();





}




  carregarFeed(){

    this.AbreCarregando();
   this.ApiProvider.ListaBares().subscribe(data=>{

      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

        this.lista = objeto_retorno.EMPRESAS;

        for(let i = 0; i < this.lista.length; i++){

            //console.log(this.lista[i].NOME);
let lat = parseFloat(this.lista[i].LATITUDE);
let log = parseFloat(this.lista[i].LONGITUDE);

          let prov = [this.lista[i].NOME, lat, log, this.lista[i].QTD_ONLINE, this.lista[i].ID_EMP];

          this.total.push(prov);
        }




 //console.log(this.total);
this.beaches = this.total;
//console.log(this.beaches);

this.initMap();
     this.FechaCarregando();

  },error=>{
    console.log(error);
    this.FechaCarregando();
  }

  )
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
  this.geo();
  this.carregarFeed();

}

initMap(){
  this.LATITUDE = parseFloat(localStorage.getItem('LATITUDE'));
  this.LONGITUDE = parseFloat(localStorage.getItem('LONGITUDE'));

  let latLng = new google.maps.LatLng(this.LATITUDE, this.LONGITUDE);


  let mapOptions = {
    center: latLng,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };




  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)


  const marker = new google.maps.Marker(
    {
      position: latLng,
      map: this.map,
      icon: "assets/imgs/vc.png",

    }

  );

  this.setMarkers(this.map);
}

teste(){
  this.navCtrl.push(PerfilPage);
}

setMarkers(map) {


  var contentString = '<div style="background-color: #d01147; color: #fff">'+
  "<a (click)='teste()'>texto aqui</a>" +
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  let image = {
    url: 'assets/imgs/vc.png',
    size: new google.maps.Size(20, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
  };

  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < this.beaches.length; i++) {
    var beach = this.beaches[i];
    var idb = beach[4];
    var marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map: map,
      title: beach[0],
      label: {
      text: beach[3],
      color: "#fff",
      fontWeight: "bold",
      },
      icon: "assets/imgs/icone_local_mapa.png"
    });

    let e = idb;

    google.maps.event.addListener(marker, 'click', (e) => {
      //infoWindow.open(this.map, marker);
      this.navCtrl.push(DetalhePage, {id: idb});
      //console.log(e);

    });
    //console.log(idb);
  }
}





//VERIFICAR LOCAL DO USUÁRIO
localiza(a,b,c,d){


  let lat1 = a;
  let lon1 = b;
  let lat2 = c;
  let lon2 = d;

  this.retorno = Dist(lat1, lon1, lat2, lon2); //Quilómetros de retorno
  let total = this.retorno * 1000;

  if(total <= 50){
    this.submit();
  }
  function Dist(lat1, lon1, lat2, lon2)
    {
    let rad = function(x) {return x*Math.PI/180;}

    var R     = 6378.137;                  //Raio da Terra no km (WGS84)
    var dLat  = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d.toFixed(3);                   //Retorno 3 casas decimais
  }





}


//LOCAL NOTIFICAÇÃO
submit() {


  this.localNotifications.schedule({
    id: 1,
    title: 'Você esta no qualivita?',
    text: 'Confirme e ganhe um cupom!',
    icon: 'file://assets/icon/local-push.png'
  });

  swal({
    title: "Você esta no Espaço Qualivita?",
    icon: "warning",
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Você ganhou 5 pontos!", {
        icon: "success",
      });
    } else {
     // swal("Your imaginary file is safe!");
    }
  });

}


}
