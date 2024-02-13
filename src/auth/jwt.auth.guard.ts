import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean |Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('token not found');
    } 

    if (token !== 'MY_AUTH_TOKEN') {
      throw new UnauthorizedException('invalid token');
    }

    return true;
  }
}
/*export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) : boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    console.log(request.session);
    if (!request.session.token) {
      response.redirect('/auth/login');
      return false
    }

    return super.canActivate(context) && request.session.token;
  }
}*/
