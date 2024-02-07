import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /*
  canActivate(context: ExecutionContext) : boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    console.log(request.session);
    if (!request.session.token) {
      response.redirect('/auth/login');
      return false
    }

    return super.canActivate(context) && request.session.token;
  }*/
}
