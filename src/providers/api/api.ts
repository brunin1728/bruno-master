import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  private baseApi = "http://bom.bar/dados/index.php?servico=";
  public CIDADE = "1";
  public USUARIO: any = localStorage.getItem('USUARIO');
  public TELEFONE: any = localStorage.getItem('TELEFONE');

  constructor(public http: Http) {

  }


salvarUsusario(nome,telefone,senha){
    return this.http.get(this.baseApi + "insert-usuario&NOME=" + nome + "&TELEFONE=" + telefone + "&SENHA=" + senha);
   }



VerificaTel(telefone){
  return this.http.get(this.baseApi + "verifica-tel&telefone=" + telefone);
 }



cupons(){
  return this.http.get(this.baseApi + "lista-cupons");
 }


 MeusPontos(){
  return this.http.get(this.baseApi + "pontos-usuario&telefone=" + this.TELEFONE);
 }


 MeusCupons(){
  return this.http.get(this.baseApi + "cupons-usuario&usuario=" + this.USUARIO);
 }


 ListaBares(page = 1){
  return this.http.get(this.baseApi + "lista-bares&cidade=" + this.CIDADE + "&page=" + page);
 }


 DetalhesBar(bar){
  return this.http.get(this.baseApi + "detalhe-bar&id=" + bar);
 }


 TrocarCupom(id){
  return this.http.get(this.baseApi + "trocar-cupom&id=" + id + "&usuario=" + this.USUARIO);
 }


 DadosUsuario(){
  return this.http.get(this.baseApi + "dados-usuario&usuario=" + this.USUARIO);
 }


 VerificarUsuario(usuario,senha){
  return this.http.get(this.baseApi + "verificar-usuario&usuario=" + usuario + "&senha=" + senha);
 }


}
