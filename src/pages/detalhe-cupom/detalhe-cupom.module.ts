import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheCupomPage } from './detalhe-cupom';

@NgModule({
  declarations: [
    DetalheCupomPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheCupomPage),
  ],
})
export class DetalheCupomPageModule {}
