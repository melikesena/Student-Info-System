/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  StudentSchema } from './student.schema';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class StudentModule {}
