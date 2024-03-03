import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CourseDocument = mongoose.HydratedDocument<Course>;

@Schema({ strict: false })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
