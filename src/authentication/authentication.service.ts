import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async hashPassword(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 100, 'sha512').toString('hex');
  }

  async validateUserLogins(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      return new NotFoundException(
        `user with this email 👉🏾 ${email} was not found`,
      );
    }
    if (
      user &&
      !(user.hashedPassword === (await this.hashPassword(password, user.salt)))
    ) {
      return new HttpException(
        'incorrect🔐 password was provided',
        HttpStatus.FORBIDDEN,
      );
    }
    if (
      user &&
      user.hashedPassword === (await this.hashPassword(password, user.salt))
    ) {
      const token = await this.createJwt(user);
      return { token };
    }
  }

  async createJwt(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
