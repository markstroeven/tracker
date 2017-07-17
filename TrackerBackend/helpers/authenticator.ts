export class Authenticator{

  public static AuthenticateWithToken(userId: number, token:string, model:any):Promise<boolean>{
    return model.findOne({where:{id: userId, accessToken: token}});
  }

}
