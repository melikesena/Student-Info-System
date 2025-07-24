/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class, ClassSchema } from './class.schema';
import { Student, StudentSchema } from '../student/student.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
