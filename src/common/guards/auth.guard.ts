import { Injectable, CanActivate, ExecutionContext, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt:JwtService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(" ")[1]
    if(!token){
      throw new UnauthorizedException(`token not found `)
    }
    try {
      const payload = await this.jwt.verifyAsync(token)
      request.userID = payload.id
    } catch (error) {
      throw new UnauthorizedException(`mistake token`)
    }
    return true
  }
}