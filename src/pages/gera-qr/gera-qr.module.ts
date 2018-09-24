import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeraQrPage } from './gera-qr';

@NgModule({
  declarations: [
    GeraQrPage,
  ],
  imports: [
    IonicPageModule.forChild(GeraQrPage),
  ],
})
export class GeraQrPageModule {}
