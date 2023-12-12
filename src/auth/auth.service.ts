import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ name, password }: LoginDto) {
    const user = await this.userService.getByName(name);
    if (!user) {
      throw new UnauthorizedException('user is not exist');
    }
    const isSame = await user.isPasswordSame(password);
    if (!isSame) {
      throw new UnauthorizedException('password is not match');
    }
    const { id } = user;
    const token = this.jwtService.sign({
      id,
      name,
    });
    return {
      id,
      name,
      token,
    };
  }
}
