import { Injectable } from '@angular/core';
import { ApplicationSettings } from '../helpers/ApplicationSettings';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Http, Response } from '@angular/http';
import { User } from '../domain/User';
@Injectable()
export class LoginService {

  private restResource: string = "login";

  constructor(private http:Http) { }

  public login(credentials: any):Observable<User>{
    return this.http.post(ApplicationSettings.getBackendLocation()+this.restResource, credentials).map(this.extractUser);
  }

  private extractUser(res: Response):User{
    try{
      return new User(res.json().payload);
    }catch(err){
      return null;
    }
  }

}
