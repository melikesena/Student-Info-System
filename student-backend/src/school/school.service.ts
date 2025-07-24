/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School, SchoolDocument } from './school.schema';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Class, ClassDocument } from '../class/class.schema';
import { Student, StudentDocument } from '../student/student.schema';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
 @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const createdSchool = new this.schoolModel(createSchoolDto);
    return createdSchool.save();
  }

  async findAll(): Promise<School[]> {
    return this.schoolModel.find().exec();
  }

  async findOne(id: string): Promise<School> {
    const school = await this.schoolModel.findById(id).exec();
    if (!school) {
      throw new NotFoundException(`School with id ${id} not found`);
    }
    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const updatedSchool = await this.schoolModel.findByIdAndUpdate(id, updateSchoolDto, { new: true }).exec();
    if (!updatedSchool) {
      throw new NotFoundException(`School with id ${id} not found`);
    }
    return updatedSchool;
  }

  async remove(id: string): Promise<void> {
    const result = await this.schoolModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`School with id ${id} not found`);
    }
  }

async getSchoolAverage(schoolId: string): Promise<number | null> {
  const classes = await this.classModel.find({ school: schoolId }).lean();
  console.log('Classes found:', classes.length);

  if (!classes.length) return null;

  const classIds = classes.map(cls => cls._id);
  console.log('Class IDs:', classIds);

  const students = await this.studentModel.find({ class: { $in: classIds } }).lean();
  console.log('Students found:', students.length);

  const allScores: number[] = [];

  for (const student of students) {
    console.log(`Student: ${student.name}, Notes count: ${student.notes?.length ?? 0}`);
    for (const note of student.notes) {
      console.log('Note score:', note.score);
      if (typeof note.score === 'number') {
        allScores.push(note.score);
      }
    }
  }

  if (allScores.length === 0) return null;

  const total = allScores.reduce((a, b) => a + b, 0);
  return parseFloat((total / allScores.length).toFixed(2));
}





}
