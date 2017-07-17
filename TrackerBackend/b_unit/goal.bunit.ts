import {Response} from 'express';
import {Goal} from '../orm/Goal';
import {TrackerRequest} from '../domain/TrackerRequest';
import {TrackerResponse} from '../domain/TrackerRespone';
import {BusinessUnit} from '../interfaces/BusinessUnit';

export class GoalBusinessUnit implements BusinessUnit{


  private goalModel : any;
  public referenceAssembly : any;

  public constructor(goalModel: Goal, referenceAssembly : any){
    this.goalModel = goalModel;
    this.referenceAssembly = referenceAssembly;
  }

  public handleGetByPCS(request: TrackerRequest, res: Response):void{
    this.goalModel.findAll({where:{parentPcs:request.params.id}}).then((dataPackage:any)=>{
      let goals: any[] = [];
      for(let goal of dataPackage){
        goals.push(goal.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: goals, timeStamp: new Date()}));
    });
  }

  public handleGet(request: TrackerRequest, res: Response):void{
    this.goalModel.findAll({where:{id:request.params.id}}).then((dataPackage:any)=>{
      let goals: any[] = [];
      for(let goal of dataPackage){
        goals.push(goal.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: goals, timeStamp: new Date()}));
    });
  }

  public handlePost(request: TrackerRequest, res: Response):void{
    console.log("creating new goal");
    console.log(request.body);
    this.goalModel.create({
      title : request.body.title,
      description: request.body.description,
      points: request.body.points,
      dueDate: request.body.dueDate,
      finished: request.body.finished,
      completed: request.body.completed,
      category : request.body.category,
      icon: request.body.icon,
      parentPcs: request.body.parentPcs
    }).then((goal: any)=>{
          res.status(200).send(new TrackerResponse({success: true, message:"Goal has been saved", timeStamp: new Date()}));
    });
  }

  public handlePatch(request: TrackerRequest, res: Response):void{
    this.goalModel.update({
      title : request.body.title,
      description: request.body.description,
      points: request.body.points,
      dueDate: request.body.dueDate,
      finished: request.body.finished,
      completed: request.body.completed,
      category : request.body.category,
      icon: request.body.icon
    },
    {
      where: {id: request.params.id}
    }).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message:"Goal has been updated", timeStamp: new Date()}));
    });
  }

  public handleDelete(request: TrackerRequest, res: Response):void{
    this.goalModel.destroy({where:{id:request.params.id}}).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message:"Goal has been destroyed", timeStamp: new Date()}));
    });
  }

}
