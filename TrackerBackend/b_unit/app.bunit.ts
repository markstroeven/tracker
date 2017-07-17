import {BusinessUnit} from '../interfaces/BusinessUnit';
import {TrackerRequest} from '../domain/TrackerRequest';
import {TrackerResponse} from '../domain/TrackerRespone';
import {Response} from 'express';

import {Action} from '../orm/Action';
import {Category} from '../orm/Category';
import {Goal} from '../orm/Goal';
import {PCS} from '../orm/PCS';
import {User} from '../orm/User';

export class AppBusinessUnit{

  private pcsModel : any;
  private actionModel : any;
  private goalModel : any;
  private userModel : any;
  private categoryModel : any;

  public referenceAssembly : any;

  public constructor(models: any, referenceAssembly : any){
    this.pcsModel = models.pcsModel;
    this.actionModel = models.actionModel;
    this.goalModel = models.goalModel;
    this.userModel = models.userModel;
    this.categoryModel = models.categoryModel;
    this.referenceAssembly = referenceAssembly;
  }




}
