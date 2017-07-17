export class HttpService{

  protected headers: any;

  public constructor(token: string){
    this.headers = {
      "authorization": token,
      "Content-Type": 'application/json'
    }
  }

}
