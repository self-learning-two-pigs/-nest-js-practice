import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './auth.dto';
import { UserService } from '../user/user.service';

export const JwtKey = '3e3r4tr5tg5hy6hyhyhb=';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getById(payload.id);
    if (!user) {
      throw new UnauthorizedException('user is not exist');
    }
    return user;
  }
}
