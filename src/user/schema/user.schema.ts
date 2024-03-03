import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../dto/user.dto';
import mongoose from 'mongoose';

@Schema({ strict: false })
export class User {
  @Prop({ enum: UserRole, default: UserRole.Student })
  role: UserRole;

  @Prop()
  hashedPassword: string;

  @Prop()
  salt: string;

  @Prop({ unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
