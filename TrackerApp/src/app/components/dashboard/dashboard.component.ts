import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { PcsService } from '../../services/pcs.service';
import { GoalService } from '../../services/goal.service';
import { PCS } from '../../domain/PCS';
import { Goal } from '../../domain/Goal';
import { routerTransition } from '../../helpers/RouterTransition';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class DashboardComponent implements OnInit {

  public numberOfCircles = [0,1,2,3,4,5];

  public svgDimension: any ={
    cx : "50",
    cy : "50",
    r  : "50"
  }

  public classnames: any[] = [
    "animation-straight-bottom",
    "animation-straight-top",
    "animation-bottom-right",
    "animation-top-left",
    "animation-top-right",
    "animation-bottom-left"
  ]

  public pcs : PCS[] = [];
  public goals: Goal[] = [];

  constructor(private router : Router, private state: StateService, private pcsService: PcsService, private goalService: GoalService) {
    pcsService.get(state.user.getValue().id).subscribe((pcs:PCS[])=>{
      this.pcs = pcs;
      this.state.broadcastSelectedPCS(pcs[0].id);
      this.goalService.get(state.user.getValue().id, pcs[0].id).subscribe((goals: Goal[])=>{
        this.goals = goals;
        let numberOfSlotsOpen = 6 - this.goals.length;
        for(var i = 0; i < numberOfSlotsOpen; i ++){
          this.goals.push(new Goal({
            points: 0,
            icon: "/assets/plus.png"
          }));
        }
        console.log(this.goals);
      });
    });
  }

  ngOnInit() {
  }

  public getTotalPoints():number{
    let sum : number = 0;
    for(let goal of this.goals){
      sum += goal.points;
    };
    return sum;
  }

  public openGoal(goal: Goal):void{
    console.log(goal);
    if(goal.id === undefined){
      this.router.navigate(['/goalnew']);
    }else{
        this.state.broadcastSelectedGoal(goal.id);
        this.router.navigate(['/goal']);
    }
  }

}
