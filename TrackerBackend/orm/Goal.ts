import {Model, DataTypes, InitOptions, BelongsTo, HasMany} from 'sequelize';
import {sequelize} from '../connections/MySQLConnection';

export class Goal extends Model{

  static associations: {
    PCS: BelongsTo,
    Action: HasMany
  };

  public    id:               number;
  public    title:            string;
  public    description:      string;
  public    points :          number;
  public    dueDate:          Date|null;
  public    finished :        Date|null;
  public    completed:        boolean;
  public    icon:             string|null;
  public    createdAt:        Date;
  public    updatedAt:        Date;

  public    PCS:              number;
  public    category:         number;

  public setPCS(PCSId: number):void{
    this.PCS = PCSId;
  }

  public getPCS():number{
    return this.PCS;
  }

  public setCategory(categoryId: number):void{
    this.category = categoryId;
  }

  public getCategory():number{
    return this.category;
  }

  public constructor(args? : any){
    super();
    this.title = args.title;
    this.description = args.description;
    this.points = args.points;
    this.dueDate = args.dueDate;
    this.finished = args.finished;
    this.completed = args.completed;
    this.icon = args.icon;
  }

}
