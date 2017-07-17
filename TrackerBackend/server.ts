'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Winston from 'winston';
import * as cors from "cors";
import {GoalRoutes} from './routes/goal.routes';
import {CategoryRoutes} from './routes/category.routes';
import {ActionRoutes} from './routes/action.routes';
import {UserRoutes} from './routes/user.routes';
import {PCSRoutes} from './routes/pcs.routes';
import { Goal } from './orm/Goal';
import { Action } from './orm/Action';
import { User } from './orm/User';
import { PCS } from './orm/PCS';
import { Category } from './orm/Category';
import {OrmMapper} from './orm/OrmMapper';
import {ApplicationRoute} from './interfaces/ApplicationRoute';
import {Request, Response} from 'express';
import {Authenticator} from './helpers/authenticator';
//native imports
const sequelize = require('./connections/MySQLSequelizeConnection');
//Initialize the express application using all of the required middleware components.
const app: express.Application = express();
const port: number = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//The ORM mapper will map the models defined in OrmMapper.ts to the database.
//The first step is to map the data object to database tables, secondly the relations-
//will be mapped upon the database. After mapping the relations a object containing all the model-
//instances will be returned which can be used to perform database transactions.
let mapper = new OrmMapper();


let referenceAssembly: any = {
  "OrmMapper" : mapper,
  "Winston" : Winston
}

var router = express.Router();
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false
};
app.use(cors(options));

mapper.mapObjectsToDatabase(sequelize).then((models)=>{
  Winston.info("Objects mapped, proceeding to map relations.");
  mapper.mapRelations(models).then(()=>{

    //middleware to check tokens with each request
    app.use((req, res, next)=>{
      let token = req.headers.authorization;
      if(req.originalUrl == "/login" || req.originalUrl.startsWith("/user")){
        next();
      }else{
        Authenticator.AuthenticateWithToken(req.query.userId, token, models.User).then((authenticationSuccess: boolean)=>{
          console.log("Returned with: " + authenticationSuccess);
          if(authenticationSuccess){
            next();
          }else{
            res.status(401).send("Invalid token or userId");
          }
        });
      }
    });

    Winston.info("Relations mapped, ORM mapping completed with statuscode: ");

    let goal_routes : ApplicationRoute = new GoalRoutes(app, models.Goal, referenceAssembly);
    let category_routes : ApplicationRoute = new CategoryRoutes(app, models.Category, referenceAssembly);
    let action_routes : ApplicationRoute = new ActionRoutes(app, models.Action, referenceAssembly);
    let user_routes : ApplicationRoute = new UserRoutes(app, models.User, referenceAssembly);
    let pcs_routes : ApplicationRoute = new PCSRoutes(app, models.PCS, referenceAssembly);
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });
  });
});
