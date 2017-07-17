import {Application, Request, Response} from 'express';
import { RequestParser } from '../helpers/RequestParser';
import { TrackerRequest } from '../domain/TrackerRequest';
import { TrackerResponse } from '../domain/TrackerRespone';
import { PCS } from '../ORM/PCS';
import {PCSBusinessUnit} from '../b_unit/pcs.bunit';
import {ApplicationRoute} from '../interfaces/ApplicationRoute';

export class PCSRoutes implements ApplicationRoute{

  private expressApplication: Application;
  private pcsModel: any;
  private referenceAssembly : any;
  private businessUnit : PCSBusinessUnit;

  public constructor(app: Application, pcsModel: PCS, referenceAssembly : any){
    this.expressApplication = app;
    this.pcsModel = pcsModel;
    this.referenceAssembly = referenceAssembly;
    this.initializeRouter(this.expressApplication);
    referenceAssembly.Winston.info("PCS rout module has been succesfully initialized.");
    this.businessUnit = new PCSBusinessUnit(pcsModel, referenceAssembly);
  }

  initializeRouter(expressApplication: Application):void{
    expressApplication.get("/pcs/byowner", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGetByOwner(request, res);
    });
    expressApplication.get("/pcs/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleGet(request, res);
    });
    expressApplication.post("/pcs/owner/:ownerId", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePost(request, res);
    });
    expressApplication.patch("/pcs/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handlePatch(request, res);
    });
    expressApplication.delete("/pcs/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.businessUnit.handleDelete(request, res);
    });
  }
}
