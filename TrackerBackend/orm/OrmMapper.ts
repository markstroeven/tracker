import { DataTypes , HasMany, Model, FindOptions} from 'sequelize';
import { await } from 'asyncawait';

//native imports
const Sequelize = require('sequelize');

export class OrmMapper{


  public constructor(){

  }

  public async mapObjectsToDatabase(sequelize:any):Promise<any>{
    return new Promise(function(resolve, reject) {
      try{

        const User = sequelize.define('User', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
          },
          familyName: {
            type: Sequelize.STRING
          },
          givenName: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING,
            unique: true
          },
          password: {
            type: Sequelize.STRING
          },
          accessToken : {
            type: Sequelize.STRING,
            unique: true
          }
        });

        const PCS = sequelize.define('PCS', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          owner: {
            type: Sequelize.INTEGER
          },
          created: {
            type: Sequelize.DATE
          },
          year: {
            type: Sequelize.INTEGER
          }
        });

        const Category = sequelize.define('Category', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title:{
            type: Sequelize.STRING
          },
          description:{
            type: Sequelize.STRING
          },
          icon : {
            type: Sequelize.STRING
          }
        });

        const Goal = sequelize.define('Goal', {
          id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title:{
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
          },
          points: {
            type: Sequelize.INTEGER
          },
          dueDate:{
            type: Sequelize.DATE
          },
          finished : {
            type: Sequelize.DATE
          },
          completed: {
            type: Sequelize.BOOLEAN
          },
          category: {
            type: Sequelize.INTEGER
          },
          icon : {
            type: Sequelize.STRING
          }
        });

        const Action = sequelize.define('Action', {
          id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title: {
            type: Sequelize.STRING
          },
          description:{
            type: Sequelize.STRING
          },
          points: {
            type: Sequelize.INTEGER
          },
          startDate : {
            type: Sequelize.DATE
          },
          dueDate: {
            type: Sequelize.DATE
          },
          progress: {
            type: Sequelize.INTEGER
          },
          finished: {
            type: Sequelize.DATE
          },
          completed: {
            type: Sequelize.BOOLEAN
          }
        });

        let models = {
          "Category":Category,
          "User":User,
          "Action":Action,
          "Goal":Goal,
          "PCS":PCS
        }
          resolve(models);
      }catch(err){
        reject(err);
      }
    });
  }

  public mapRelations(models: any):Promise<any>{
    return new Promise(function(resolve, reject) {
      try{
        models.PCS.belongsTo(models.User, {foreignKey:"owner", onDelete:"cascade"});
        models.User.hasMany(models.PCS, {foreignKey:"owner", onDelete:"cascade"});

        models.Goal.belongsTo(models.PCS, {foreignKey: "parentPcs", onDelete:"cascade"});
        models.PCS.hasMany(models.Goal, {foreignKey: "parentPcs", onDelete:"cascade"});

        models.Action.belongsTo(models.Goal, {foreignKey: "goal", onDelete:"cascade"});
        models.Goal.hasMany(models.Action, {foreignKey: "goal", onDelete:"cascade"});

        models.Category.sync().then(()=>{
          models.User.sync().then(()=>{
            models.PCS.sync().then(()=>{
              models.Goal.sync().then(()=>{
                models.Action.sync().then(()=>{
                  resolve();
                });
              });
            });
          });
        });
      }catch(err){
        reject(err);
      }
    });
  }
}
