import {BusinessUnit} from '../interfaces/BusinessUnit';
import {TrackerRequest} from '../domain/TrackerRequest';
import {TrackerResponse} from '../domain/TrackerRespone';
import {Response} from 'express';
import {Action} from '../orm/Action';

export class ActionBusinessUnit implements BusinessUnit{

  private actionModel : any;
  public referenceAssembly : any;

  public constructor(actionModel: Action, referenceAssembly : any){
    this.actionModel = actionModel;
    this.referenceAssembly = referenceAssembly;
  }

  public handleGet(request: TrackerRequest, res: Response):void{
    this.actionModel.findAll({where: {id: request.params.id}}).then((dataPackage:any)=>{
      let actions: any[] = [];
      for(let action of dataPackage){
        actions.push(action.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: actions, timeStamp: new Date()}));
    });
  }
  public handlePost(request: TrackerRequest, res: Response):void{
    this.actionModel.create({
      title: request.body.title,
      description : request.body.description,
      points : request.body.points,
      progress : request.body.progress,
      dueDate : request.body.dueDate,
      finished : request.body.finished,
      completed : request.body.completed,
      icon : request.body.icon,
      goal: request.body.goalId
    }).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "Action has ben succesfully saved.", timeStamp: new Date()}));
    });
  }
  public handlePatch(request: TrackerRequest, res: Response):void{
    this.actionModel.update({
      title: request.body.title,
      description : request.body.description,
      points : request.body.points,
      progress : request.body.progress,
      dueDate : request.body.dueDate,
      finished : request.body.finished,
      completed : request.body.completed,
      icon : request.body.icon
    },
    {
      where: {id:request.params.id}
    }).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "Action has ben succesfully updated.", timeStamp: new Date()}));
    });
  }
  public handleDelete(request: TrackerRequest, res: Response):void{
    this.actionModel.destroy({where:{id: request.params.id}}).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "Action has ben succesfully deleted.", timeStamp: new Date()}));
    });
  }

  public handleGetByGoal(request: TrackerRequest, res: Response):void{
    this.actionModel.findAll({where: {goal: request.params.id}}).then((dataPackage:any)=>{
      let actions: any[] = [];
      for(let action of dataPackage){
        actions.push(action.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: actions, timeStamp: new Date()}));
    });
  }

}
