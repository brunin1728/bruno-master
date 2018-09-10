import { DetalhePage } from './../detalhe/detalhe';
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { ApiProvider } from '../../providers/api/api';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ApiProvider
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

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public ApiProvider: ApiProvider,
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation
    ) {

  }


geo(){

   const config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false,
    stopOnTerminate: false,
    interval: 1
};

this.backgroundGeolocation.configure(config)
.subscribe((location: BackgroundGeolocationResponse) => {
  this.lat = location.latitude;
  this.log = location.longitude;


  this.LATITUDE = localStorage.setItem("LATITUDE", this.lat);
  this.LONGITUDE = localStorage.setItem("LONGITUDE", this.log);

this.carregarFeed();

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




 console.log(this.total);
this.beaches = this.total;
console.log(this.beaches);

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
    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map, marker);
      this.navCtrl.push(DetalhePage, {id: beach[4]});
    });
  }
}


}
