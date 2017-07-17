import { Request } from 'express';
export class TrackerRequest{

  public  requestToken    :   string;
  public  requestOrigin   :   string;
  public  body            :   any;
  public  params          :   any;
  public  queryParams     :   any;

  public constructor(req : Request){
    if(req !== null){
      this.requestToken = req.headers.requestToken;
      this.requestOrigin = req.connection.remoteAddress;
      this.body = req.body;
      this.params = req.params;
      this.queryParams = req.query;
    }else{
      throw new Error("Invalid request arguments.");
    }
  }

}
