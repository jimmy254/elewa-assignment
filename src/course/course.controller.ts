import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.role.decorator';
import { UserRole } from '../user/dto/user.dto';
import { AuthenticationJwtGuard } from '../authentication/authentication.jwt.guard';

@ApiBearerAuth()
@UseGuards(AuthenticationJwtGuard)
@ApiTags('Course CRUD Operations')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({
    summary: 'Creates a new course based on given dynamic properties',
  })
  @User(UserRole.Tutor, UserRole.Admin)
  @Post('/create')
  async createCourse(@Body() createCourse: CreateCourseDto) {
    return await this.courseService.create(createCourse);
  }

  @ApiOperation({ summary: 'Return a list of all available courses' })
  @User(UserRole.Tutor, UserRole.Admin, UserRole.Student)
  @Get('/list')
  async listCourses() {
    return await this.courseService.findAll();
  }

  @ApiOperation({ summary: 'Update an existing course based on provided _id' })
  @User(UserRole.Tutor, UserRole.Admin)
  @Post('/update')
  async updateCourse(@Body() updateCourse, @Query('course') courseId: string) {
    return await this.courseService.update(courseId, updateCourse);
  }

  @ApiOperation({ summary: 'Delete an existing course based on provided _id' })
  @User(UserRole.Tutor, UserRole.Admin)
  @Delete('/delete')
  async deleteCourse(@Query('course') courseId: string) {
    return await this.courseService.delete(courseId);
  }
}
