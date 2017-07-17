export class ApplicationSettings{

  public static host: string = "http://127.0.0.1";
  public static port : number = 3000;

  public static getBackendLocation():string{
    return this.host + ":" + this.port.toString() + "/"
  }

}
