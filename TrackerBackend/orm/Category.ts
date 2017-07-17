import {Model, DataTypes, InitOptions} from 'sequelize';
import {sequelize} from '../connections/MySQLConnection';

export class Category extends Model{

  public    id:               number;
  public    title:            string;
  public    description:      string;
  public    icon:             string|null;
  public    createdAt:        Date;
  public    updatedAt:        Date;

  public constructor(args?:any){
    super();
    this.title = args.title;
    this.description = args.description,
    this.icon = args.icon;
  }

}
