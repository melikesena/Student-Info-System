/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { School, SchoolSchema } from './school.schema';
import { Class, ClassSchema } from '../class/class.schema';
import { Student, StudentSchema } from '../student/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),  // Bunu ekle
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), // Bunu ekle
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
