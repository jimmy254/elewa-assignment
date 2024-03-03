import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.role.decorator';
import { AuthenticationJwtGuard } from '../authentication/authentication.jwt.guard';

@ApiTags('User Operations')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary:
      'Create a new user. JWT Token not required for easy initial user setup.',
  })
  @Post('/create')
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }

  @ApiOperation({ summary: 'List all users.' })
  @ApiBearerAuth()
  @UseGuards(AuthenticationJwtGuard)
  @User(UserRole.Admin, UserRole.Tutor)
  @Get('/list')
  async listUsers() {
    return await this.userService.findAll();
  }
}
