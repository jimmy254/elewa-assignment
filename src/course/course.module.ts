import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/course.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    UserModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
