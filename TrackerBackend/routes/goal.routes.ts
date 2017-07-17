import {Application, Request, Response} from 'express';
import { RequestParser } from '../helpers/RequestParser';
import { TrackerRequest } from '../domain/TrackerRequest';
import { TrackerResponse } from '../domain/TrackerRespone';
import { Goal } from '../ORM/Goal';
import {GoalBusinessUnit} from '../b_unit/goal.bunit';
import {ApplicationRoute} from '../interfaces/ApplicationRoute';

export class GoalRoutes implements ApplicationRoute{

  private expressApplication: Application;
  private goalModel: any;
  private referenceAssembly : any;
  private businessUnit : GoalBusinessUnit;

  public constructor(app: Application, goalModel: Goal, referenceAssembly : any){
    this.expressApplication = app;
    this.goalModel = goalModel;
    this.referenceAssembly = referenceAssembly;
    this.initializeRouter(this.expressApplication);
    referenceAssembly.Winston.info("Goal rout module has been succesfully initialized.");
    this.businessUnit = new GoalBusinessUnit(goalModel, referenceAssembly);
  }

  initializeRouter(expressApplication: Application):void{
    expressApplication.get("/goal/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGet(request, res);
    });
    expressApplication.post("/goal", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePost(request, res);
    });
    expressApplication.patch("/goal/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePatch(request, res);
    });
    expressApplication.delete("/goal/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleDelete(request, res);
    });
    expressApplication.get("/goal/bypcs/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGetByPCS(request, res);
    });
  }
}
