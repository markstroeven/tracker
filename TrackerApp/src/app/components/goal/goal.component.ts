import { Component, OnInit, trigger, transition, style, animate , state} from '@angular/core';
import { routerTransition } from '../../helpers/RouterTransition';
import { StateService } from '../../services/state.service';
import { Goal } from '../../domain/Goal';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class GoalComponent implements OnInit {

  public totalPoints : number  = 0;
  public showGoalDescription: boolean = false;
  public showActions: boolean = false;
  public goal: Goal = new Goal({

  });
  constructor(private state: StateService, private goalService: GoalService) {
    this.goalService.getOne(this.state.user.getValue().id, this.state.selectedGoal.getValue()).subscribe((goals: Goal[])=>{
      this.goal = goals[0];
      console.log(goals);
    });
  }

  ngOnInit() {
  }

  public toggleGoalDescription():void{
    this.showGoalDescription = this.showGoalDescription ? false: true;
  }
  public toggleActions():void{
    this.showActions = this.showActions ? false: true;
  }

}
