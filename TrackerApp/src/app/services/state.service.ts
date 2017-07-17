import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../domain/User';

@Injectable()
export class StateService {
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public selectedGoal: BehaviorSubject<number> =  new BehaviorSubject(null);
  public pcsId: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor() { }

  public broadcastUserSignIn(user:User):void{
    this.user.next(user);
  }
  public broadcastSelectedGoal(newGoal: number):void{
    this.selectedGoal.next(newGoal);
  }
  public broadcastSelectedPCS(newPCS:number):void{
    this.pcsId.next(newPCS);
  }
}
