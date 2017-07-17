import { Component, OnInit, style, animate, trigger, transition } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../helpers/RouterTransition';
import { Goal } from '../../domain/Goal';
import {GoalService} from '../../services/goal.service';
import {StateService} from '../../services/state.service';
import {wizzardTransition} from '../../animation/WizzardTransition';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ActionDialogComponent} from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-goal-wizzard',
  templateUrl: './goal-wizzard.component.html',
  styleUrls: ['./goal-wizzard.component.css'],
  animations: [
    routerTransition(),
    wizzardTransition()
  ],
  host: {'[@routerTransition]': ''}
})
export class GoalWizzardComponent implements OnInit {

  public goal : Goal = new Goal({});
  public currentStep = 1;

  constructor(
    private router: Router,
    private goalService: GoalService,
    private state: StateService,
    private mdDialog: MdDialog){

    }

  ngOnInit() {
  }

  public nextStep(selectedCategory:number):void{
    this.goal.category = selectedCategory;
    this.currentStep += 1;
  }

  public previousStep():void{
    this.currentStep -= 1;
  }

  public routeHome():void{
    this.router.navigate(['/dashboard']);
  }

  public save():void{
    let userId: number = this.state.user.getValue().id;
    this.goal.parentPcs = this.state.pcsId.getValue();
    this.goal.icon = "/assets/science.png"
    this.goal.completed = false;
    this.goal.category = 1;
    this.goalService.post(userId, this.goal).subscribe((res:any)=>{
      console.log(res);
      this.router.navigate(['/dashboard']);
    });
  }

  public openActionDialog():void{
    let dialogRef: MdDialogRef<ActionDialogComponent> = this.mdDialog.open(ActionDialogComponent,
      {
        width: '100%',
        height: '100%'
      });
    dialogRef.componentInstance.dialogRef = dialogRef;
  }

}
