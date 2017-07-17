import {Response} from 'express';
import {BusinessUnit} from '../interfaces/BusinessUnit';
import {TrackerRequest} from '../domain/TrackerRequest';
import {TrackerResponse} from '../domain/TrackerRespone';
import {Category} from '../orm/Category';

export class CategoryBusinessUnit implements BusinessUnit{

  private categoryModel : any;
  public referenceAssembly : any;

  public constructor(categoryModel: Category, referenceAssembly : any){

    this.categoryModel = categoryModel;
    this.referenceAssembly = referenceAssembly;

  }

  public handleGet(request: TrackerRequest, res:Response):void{
    this.categoryModel.findAll({where: {id: request.params.id}}).then((dataPackage:any)=>{
      let categories: any[] = [];
      for(let action of dataPackage){
        categories.push(action.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: categories, timeStamp: new Date()}));
    });
  }
  public handlePost(request: TrackerRequest, res:Response):void{
    this.categoryModel.create({
      title: request.body.title,
      description : request.body.description,
      icon: request.body.icon
    }).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "Category has been saved.", timeStamp: new Date()}));
    });
  }
  public handlePatch(request: TrackerRequest, res:Response):void{
    this.categoryModel.update({
      title: request.body.title,
      description : request.body.description,
      icon: request.body.icon
    },
  {
    where: {id: request.params.id}
  }).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "Category has been updated.", timeStamp: new Date()}));
    });
  }
  public handleDelete(request: TrackerRequest, res:Response):void{
    this.categoryModel.destroy({where:{id: request.params.id}}).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "Category has been deleted.", timeStamp: new Date()}));
    });
  }

}
