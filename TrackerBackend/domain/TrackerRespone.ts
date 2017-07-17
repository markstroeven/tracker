export class TrackerResponse{

  public success  :   boolean;
  public message  :   string;
  public timeStamp:   Date;
  public payload  :   any;

  public constructor(args? : any){
    if(args !== null){
      this.success = args.success;
      this.message = args.message;
      this.timeStamp = args.timeStamp;
      this.payload = args.payload;
    }else{
      throw new Error("Invalid request arguments.");
    }
  }

}
