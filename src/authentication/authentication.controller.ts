import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Operations')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @ApiOperation({ summary: 'Login to Elewa' })
  @Post('/login')
  async login(@Body() logins) {
    return this.authService.validateUserLogins(logins.email, logins.password);
  }
}
