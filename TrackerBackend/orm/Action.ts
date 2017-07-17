import {Model, DataTypes, InitOptions, BelongsTo} from 'sequelize';
import {sequelize} from '../connections/MySQLConnection';

export class Action extends Model{

  static associations: {
    Goal: BelongsTo
  };

  public    id:               number;
  public    title:            string;
  public    description:      string;
  public    points :          number;
  public    progress :        number|null
  public    dueDate:          Date|null;
  public    finished :        Date|null;
  public    completed:        boolean;
  public    icon:             string|null;
  public    createdAt:        Date;
  public    updatedAt:        Date;

  public    goal:             number;

  public setGoal(goalId:number):void{
    this.goal = goalId;
  }

  public getGoal():number{
    return this.goal;
  }

  public constructor(args?: any){
    super();
    this.title = args.title;
    this.description = args.description;
    this.points = args.points;
    this.progress = args.progress;
    this.dueDate = args.dueDate;
    this.finished = args.finished;
    this.completed = args.completed;
    this.icon = args.icon;
  }

}
