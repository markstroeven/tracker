import {Application, Request, Response} from 'express';
import { RequestParser } from '../helpers/RequestParser';
import { TrackerRequest } from '../domain/TrackerRequest';
import { TrackerResponse } from '../domain/TrackerRespone';
import { Action } from '../ORM/Action';
import {ActionBusinessUnit} from '../b_unit/action.bunit';
import {ApplicationRoute} from '../interfaces/ApplicationRoute';

export class ActionRoutes implements ApplicationRoute {

  private expressApplication: Application;
  private actionModel: any;
  private referenceAssembly : any;
  private businessUnit : ActionBusinessUnit;


  public constructor(app: Application, actionModel: Action, referenceAssembly : any){
    this.expressApplication = app;
    this.actionModel = actionModel;
    this.referenceAssembly = referenceAssembly;
    this.initializeRouter(this.expressApplication);
    referenceAssembly.Winston.info("Action rout module has been succesfully initialized.");
    this.businessUnit = new ActionBusinessUnit(actionModel, referenceAssembly);
  }

  initializeRouter(expressApplication: Application):void{

    expressApplication.get("/action/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGet(request, res);
    });
    expressApplication.get("/action/bygoal/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGetByGoal(request, res);
    });
    expressApplication.post("/action", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePost(request, res);
    });
    expressApplication.patch("/action/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePatch(request, res);
    });
    expressApplication.delete("/action/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleDelete(request, res);
    });

  }

}
