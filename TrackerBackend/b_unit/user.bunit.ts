import {Response} from 'express';
import {BusinessUnit} from '../interfaces/BusinessUnit';
import { TrackerRequest } from '../domain/TrackerRequest';
import { TrackerResponse } from '../domain/TrackerRespone';
import {User} from '../orm/User';

export class UserBusinessUnit implements BusinessUnit{

  private userModel : any;
  public referenceAssembly : any;

  public constructor(userModel: User, referenceAssembly : any){
    this.userModel = userModel;
    this.referenceAssembly = referenceAssembly;
  }

  public handleLogin(request: TrackerRequest, res:Response):void{
    this.userModel.findOne({where: {email: request.body.username, password: request.body.password}}).then((datapPackage: any)=>{
      let payload = datapPackage === null? null : datapPackage.dataValues;
      console.log(payload);
      res.status(200).send(new TrackerResponse({success: true, payload: payload, timeStamp: new Date()}));
    });
  }

  handleGet(request: TrackerRequest, res:Response):void{
    this.userModel.findAll({where:{id: request.params.id}}).then((dataPackage:any)=>{
      let users : any[] = [];
      for(let user of dataPackage){
        users.push(user.dataValues);
      }
      res.status(200).send(new TrackerResponse({success: true, payload: users, timeStamp: new Date()}));
    });
  };
  handlePost(request: TrackerRequest, res:Response):void{
    genToken().then((token:any)=>{
      console.log(token);
      this.userModel.create({
          familyName: request.body.familyName,
          givenName: request.body.givenName,
          email: request.body.email,
          password: request.body.password,
          accessToken: token
      }).then(()=>{
          res.status(200).send(new TrackerResponse({success: true, message: "User has been saved.", timeStamp: new Date()}));
      });
    });
  };
  handlePatch(request: TrackerRequest, res:Response):void{
    this.userModel.update({
      familyName: request.body.familyName,
      givenName: request.body.givenName,
      email: request.body.email,
      password: request.body.password
    },
  {
    where:{id: request.params.id}
  }).then(()=>{
    res.status(200).send(new TrackerResponse({success: true, message: "User has been updated.", timeStamp: new Date()}));
  });
  };
  handleDelete(request: TrackerRequest, res:Response):void{
    this.userModel.destroy({where: {id: request.params.id}}).then(()=>{
      res.status(200).send(new TrackerResponse({success: true, message: "User has been deleted.", timeStamp: new Date()}));
    });
  }

}

async function genToken(){
  return new Promise((resolve, reject)=>{
    try{
      require('crypto').randomBytes(48, function(err:any, buffer:any) {
        resolve(buffer.toString('hex'));
      });
    }catch(err){
      reject(err);
    }
  });
}
