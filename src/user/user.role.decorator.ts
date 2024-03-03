import { SetMetadata } from '@nestjs/common';
import { UserRole } from './dto/user.dto';

export const ROLES_KEY = 'roles';
export const User = (...roles: UserRole[]) => SetMetadata('ROLES_KEY', roles);
