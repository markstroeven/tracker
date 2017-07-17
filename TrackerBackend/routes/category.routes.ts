import { Application, Request, Response } from 'express';
import { Category } from '../ORM/Category';
import {CategoryBusinessUnit} from '../b_unit/category.bunit';
import {RequestParser} from '../helpers/RequestParser';
import {TrackerRequest} from '../domain/TrackerRequest';
import {ApplicationRoute} from '../interfaces/ApplicationRoute';

export class CategoryRoutes implements ApplicationRoute{

  private expressApplication: Application;
  private categoryModel: any;
  public referenceAssembly : any;
  public BusinessUnit: CategoryBusinessUnit;

  public constructor(app: Application, categoryModel: Category, referenceAssembly : any){
    this.expressApplication = app;
    this.categoryModel = categoryModel;
    this.referenceAssembly = referenceAssembly;
    this.initializeRouter(this.expressApplication);
    referenceAssembly.Winston.info("Category rout module has been succesfully initialized.");
    this.BusinessUnit = new CategoryBusinessUnit(this.categoryModel, this.referenceAssembly);
  }

  initializeRouter(expressApplication: Application):void{

    expressApplication.get("/category/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.BusinessUnit.handleGet(request, res);
    });
    expressApplication.post("/category", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.BusinessUnit.handlePost(request, res);
    });
    expressApplication.patch("/category/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.BusinessUnit.handlePatch(request, res);
    });
    expressApplication.delete("/category/:id", (req: Request, res: Response)=>{
      let request : TrackerRequest = RequestParser.parse(req);
      this.BusinessUnit.handleDelete(request, res);
    });

  }


}
