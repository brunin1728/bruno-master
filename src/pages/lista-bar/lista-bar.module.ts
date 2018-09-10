import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaBarPage } from './lista-bar';

@NgModule({
  declarations: [
    ListaBarPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaBarPage),
  ],
})
export class ListaBarPageModule {}
