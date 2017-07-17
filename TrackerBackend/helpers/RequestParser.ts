import { TrackerRequest } from '../domain/TrackerRequest';
import { Request } from 'express';

export class RequestParser{
  public static parse(req: Request): TrackerRequest{
    return new TrackerRequest(req);
  }
}
