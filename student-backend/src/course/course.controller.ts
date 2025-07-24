/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './course.schema';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }
  @Get(':courseId/class/:classId/passfail')
  async getPassFail(@Param('classId') classId: string, @Param('courseId') courseId: string) {
    const result = await this.courseService.getPassFailByCourse( courseId);
    return result;
  }
  
  @Get(':courseId/sorted')
async getSortedStudents(
  @Param('courseId') courseId: string,
  @Query('order') order: 'asc' | 'desc' = 'desc',
) {
  return this.courseService.getStudentsSortedByCourseScore(courseId, order);
}


  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.courseService.remove(id);
  }
}
