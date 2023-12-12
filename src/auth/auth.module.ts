import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtKey, JwtStrategy } from './jwt.strategy';

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JwtKey,
      signOptions: {
        expiresIn: '10m',
      },
    }),
    passportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule],
})
export class AuthModule {}
