export class User{

  public    id:             number;
  public    familyName :    string;
  public    givenName:      string;
  public    email:          string;
  public    accessToken:     string;

  public constructor(args?:any){
    this.id = args.id;
    this.familyName = args.familyName;
    this.givenName = args.givenName;
    this.email = args.email;
    this.accessToken = args.accessToken;
  }
}
