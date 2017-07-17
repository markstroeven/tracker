import {BusinessUnit} from '../interfaces/BusinessUnit';
import {TrackerRequest} from '../domain/TrackerRequest';
import {TrackerResponse} from '../domain/TrackerRespone';
import {Response} from 'express';
import {PCS} from '../orm/PCS';
import {sequelize} from '../connections/MySQLConnection';

export class PCSBusinessUnit implements BusinessUnit{

  private pcsModel : any;
  public referenceAssembly : any;

  public constructor(pcsModel: PCS, referenceAssembly : any){
    this.pcsModel = pcsModel;
    this.referenceAssembly = referenceAssembly;
  }

  handleGet(request: TrackerRequest, res:Response):void{
    this.pcsModel.findAll({where:{id: request.params.id}}).then((dataPackage:any)=>{
      console.log(dataPackage);
      let PCSS = [];
      for(let pcs of dataPackage){
        PCSS.push(pcs.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: PCSS, timeStamp: new Date()}));
    });
  };

  handleGetByOwner(request: TrackerRequest, res:Response):void{
    this.pcsModel.findAll({where:{owner: request.queryParams.ownerId}}).then((dataPackage:any)=>{
      let PCSS : PCS[]= [];
      console.log(request.queryParams);
      console.log(dataPackage);
      for(let pcs of dataPackage){
        PCSS.push(pcs.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: PCSS, timeStamp: new Date()}));
    });
  }


  handlePost(request: TrackerRequest, res:Response):void{
    this.pcsModel.create({
        created : new Date().toString(),
        year: new Date().getUTCFullYear().toString(),
        owner: request.params.ownerId
    }).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message:"pcs has been saved", timeStamp: new Date()}));
    });
  };
  handlePatch(request: TrackerRequest, res:Response):void{
    this.pcsModel.update({
      created : request.body.created,
      year: request.body.year
    },
  {
    where:{id: request.params.id}
  });
  };
  handleDelete(request: TrackerRequest, res:Response):void{
    this.pcsModel.destroy({where:{id: request.params.id}}).then(()=>{
    res.status(200).send(new TrackerResponse({success: true, message:"pcs has been saved", timeStamp: new Date()}));
    });
  };

}
