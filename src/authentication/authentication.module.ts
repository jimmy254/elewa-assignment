import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationJwtStrategy } from './authentication.jwt.strategy';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    UserModule,
    PassportModule,
  ],
  providers: [
    AuthenticationService,
    AuthenticationJwtStrategy,
    ConfigService,
    UserService,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
