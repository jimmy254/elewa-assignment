import {
  HttpException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  //Create a new course
  async create(createCourse): Promise<HttpException | Course> {
    try {
      const createdCourse = new this.courseModel(createCourse);
      console.log(`New user created: ${createdCourse.name}`);
      return createdCourse.save();
    } catch (error) {
      return new NotImplementedException(
        `Something went wrong!. ${error.error}-${error.message}`,
      );
    }
  }

  //Return all available courses
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  //Update an existing course
  async update(
    courseId: string,
    updateCourse,
  ): Promise<HttpException | Course> {
    try {
      let response = this.courseModel.findByIdAndUpdate(courseId, updateCourse);
      return response;
    } catch (error) {
      return new NotImplementedException(
        `Course update was unsuccessful!. ${error.message}`,
      );
    }
  }

  //Delete an existing course
  async delete(id: string): Promise<HttpException | Course> {
    try {
      return this.courseModel.findByIdAndDelete(id);
    } catch (error) {
      return new NotFoundException(
        `Course deletion unsuccessful. ${error.error}-${error.message}`,
      );
    }
  }
}
