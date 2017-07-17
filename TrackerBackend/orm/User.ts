import {
  Model,
  DataTypes,
  InitOptions,
  HasMany
} from 'sequelize';
import {sequelize} from '../connections/MySQLConnection';

export class User extends Model{

    static associations: {
      PCS: HasMany
    };

    public    id:               number;
    public    familyName:       string;
    public    givenName:        string;
    public    email:            string;
    public    password:         string;
    public    createdAt:        Date;
    public    updatedAt:        Date;

}
