import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion, usuarioDTO } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient: HttpClient) { }

  apiURL = environment.apiURL+'cuentas';
  private readonly llavetoken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';

  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.httpClient.get<usuarioDTO>(`${this.apiURL}/listadousuarios`,{observe: 'response', params})
  }

  hacerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/haceradmin`, JSON.stringify(usuarioId),{headers});
  }

  removerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/removerAdmin`, JSON.stringify(usuarioId),{headers});
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llavetoken);
    if (!token){
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);
    if (expiracionFecha <= new Date()){
      this.logout();
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem(this.llavetoken);
    localStorage.removeItem(this.llaveExpiracion);

  }

  obtenerRol(): string{
    return this.obtenerCampoJTW(this.campoRol);
  }

  obtenerCampoJTW(campo: string): string{
    const token = localStorage.getItem(this.llavetoken);
    if (!token){return ''}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];

  }

  registrar(credenciales: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL+'/crear',credenciales)
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion)
  {
    localStorage.setItem(this.llavetoken,respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion,respuestaAutenticacion.expiracion.toString());
  }

  login(credenciales: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL+'/login',credenciales)
  }

  obtenerToken(){
    return localStorage.getItem(this.llavetoken);
  }


}
