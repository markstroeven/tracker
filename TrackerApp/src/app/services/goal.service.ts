import { Injectable } from '@angular/core';
import { StateService } from '../services/state.service';
import { HttpService } from '../services/HttpService';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Http, URLSearchParams, Response} from '@angular/http';
import { Goal } from '../domain/Goal';
import { ApplicationSettings } from '../helpers/ApplicationSettings';

@Injectable()
export class GoalService extends HttpService{

  public restResource = "goal";

  constructor(private state: StateService, private http : Http) {
    super(state.user.getValue().accessToken);
  }
    public get(userId:number, pcsId: number):Observable<Goal[]>{
      let params = new URLSearchParams();
      params.set("userId", userId.toString());
      return this.http.get(ApplicationSettings.getBackendLocation()+this.restResource+"/bypcs/"+pcsId, {search: params, headers: this.headers}).map(this.extractGoal);
    }

    public getOne(userId:number, goalId: number):Observable<Goal[]>{
      let params = new URLSearchParams();
      params.set("userId", userId.toString());
      return this.http.get(ApplicationSettings.getBackendLocation()+this.restResource+"/"+goalId, {search: params, headers: this.headers}).map(this.extractGoal);
    }

    public post(userId:number, payload:Goal):Observable<Response>{
      let params = new URLSearchParams();
      params.set("userId", userId.toString());
      return this.http.post(ApplicationSettings.getBackendLocation()+this.restResource, payload, {search: params, headers: this.headers});
    }

    public delete(userId:number, payload:Goal):Observable<Response>{
      let params = new URLSearchParams();
      params.set("id", payload.id.toString());
      params.set("userId", userId.toString());
      return this.http.delete(ApplicationSettings.getBackendLocation()+this.restResource, {search: params, headers: this.headers});
    }

    public patch(userId:number, payload:Goal):Observable<Response>{
      let params = new URLSearchParams();
      params.set("id", payload.id.toString());
      params.set("userId", userId.toString());
      return this.http.patch(ApplicationSettings.getBackendLocation()+this.restResource, payload, {search: params, headers: this.headers});
    }

    public extractGoal(res: Response): Goal[]{
      let arr : Goal[] = [];
      let body = res.json().payload;
      for(let element of body){
        arr.push(new Goal(element));
      }
      return arr;
    }

}
