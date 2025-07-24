/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { CourseModule } from './course/course.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/studentdb'), SchoolModule, StudentModule, ClassModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
