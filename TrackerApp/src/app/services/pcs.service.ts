import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ApplicationSettings } from '../helpers/ApplicationSettings';
import { PCS } from '../domain/PCS';
import { StateService } from '../services/state.service';
import { HttpService } from '../services/HttpService';

@Injectable()
export class PcsService extends HttpService{

  public restResource: string = "pcs"

  constructor(private http: Http, private state: StateService) {
    super(state.user.getValue().accessToken);
  }

  public get(userId:number):Observable<PCS[]>{
    let params = new URLSearchParams();
    params.set("userId", userId.toString());
    params.set("ownerId", userId.toString());
    return this.http.get(ApplicationSettings.getBackendLocation()+this.restResource+"/byowner", {search: params, headers: this.headers}).map(this.extractPCS);
  }

  public post(userId:number, payload:PCS):Observable<Response>{
    let params = new URLSearchParams();
    params.set("userId", userId.toString());
    return this.http.post(ApplicationSettings.getBackendLocation()+this.restResource, payload, {search: params, headers: this.headers});
  }

  public delete(userId:number, payload:PCS):Observable<Response>{
    let params = new URLSearchParams();
    params.set("id", payload.id.toString());
    params.set("userId", userId.toString());
    return this.http.delete(ApplicationSettings.getBackendLocation()+this.restResource, {search: params, headers: this.headers});
  }

  public patch(userId:number, payload:PCS):Observable<Response>{
    let params = new URLSearchParams();
    params.set("id", payload.id.toString());
        params.set("userId", userId.toString());
    return this.http.patch(ApplicationSettings.getBackendLocation()+this.restResource, payload, {search: params, headers: this.headers});
  }

  public extractPCS(res: Response): PCS[]{
    let arr : PCS[] = [];
    let body = res.json().payload;
    for(let element of body){
      arr.push(element);
    }
    return arr;
  }

}
