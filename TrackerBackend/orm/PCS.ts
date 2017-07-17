import {
  Model,
  DataTypes,
  InitOptions,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsTo,
  HasMany
} from 'sequelize';
import {sequelize} from '../connections/MySQLConnection';

export class PCS extends Model{

  static associations: {
    User: BelongsTo,
    Goal: HasMany
  };

  public    owner:            number;
  public    id:               number;
  public    created:          Date|null;
  public    year:             string|null;
  public    createdAt:        Date;
  public    updatedAt:        Date;

  public setOwner(userId:number):void{
    this.owner = userId;
  }

  public getOwner(): number{
    return this.owner;
  }

  public constructor(args?: any){
    super();
    this.created = args.created;
    this.year = args.year;
  }

}
