import {ApplicationRoute} from '../interfaces/ApplicationRoute';
import {TrackerRequest} from '../domain/TrackerRequest';
import {RequestParser} from '../helpers/RequestParser';
import {Application, Request, Response} from  'express';
import {User} from '../orm/User';
import {UserBusinessUnit} from '../b_unit/user.bunit';

export class UserRoutes implements ApplicationRoute{

  private expressApplication: Application;
  private userModel: any;
  private referenceAssembly : any;
  private businessUnit : UserBusinessUnit;

  public constructor(app: Application, userModel: User, referenceAssembly : any){
    this.expressApplication = app;
    this.userModel = userModel;
    this.referenceAssembly = referenceAssembly;
    this.initializeRouter(this.expressApplication);
    referenceAssembly.Winston.info("User rout module has been succesfully initialized.");
    this.businessUnit = new UserBusinessUnit(userModel, referenceAssembly);
  }

  initializeRouter(expressApplication: Application):void{
    expressApplication.get("/user/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGet(request, res);
    });
    expressApplication.post("/user", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePost(request, res);
    });
    expressApplication.post("/login", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleLogin(request, res);
    });
    expressApplication.patch("/user/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePatch(request, res);
    });
    expressApplication.delete("/user/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleDelete(request, res);
    });
  }

}
