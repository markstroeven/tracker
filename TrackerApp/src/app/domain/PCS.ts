export class PCS{

  public    id:               number;
  public    created:          Date|null;
  public    year:             string|null;
  public    createdAt:        Date;
  public    updatedAt:        Date;

  public constructor(args?:any){
    this.id = args.id;
    this.created = args.created;
    this.year = args.year;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }

}
