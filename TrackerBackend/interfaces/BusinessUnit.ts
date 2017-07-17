import {Response} from 'express';
import {TrackerRequest} from '../domain/TrackerRequest';
export interface BusinessUnit{
  handleGet(request: TrackerRequest, res:Response):void;
  handlePost(request: TrackerRequest, res:Response):void;
  handlePatch(request: TrackerRequest, res:Response):void;
  handleDelete(request: TrackerRequest, res:Response):void;
}
