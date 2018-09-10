import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadNomeSenhaPage } from './cad-nome-senha';

@NgModule({
  declarations: [
    CadNomeSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadNomeSenhaPage),
  ],
})
export class CadNomeSenhaPageModule {}
