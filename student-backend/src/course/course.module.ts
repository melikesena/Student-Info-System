/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { StudentModule } from '../student/student.module'; 

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
StudentModule,],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
