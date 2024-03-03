import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'Admin',
  Tutor = 'Tutor',
  Student = 'Student',
}

export class CreateUserDto {
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}
