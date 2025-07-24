/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Class, ClassDocument } from './class.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

import { Student, StudentDocument } from '../student/student.schema';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  create(createClassDto: CreateClassDto): Promise<Class> {
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  findAll(): Promise<Class[]> {
    return this.classModel.find().exec();
  }

  async findOne(id: string): Promise<Class> {
    const foundClass = await this.classModel.findById(id).exec();
    if (!foundClass) {
      throw new NotFoundException(`Class with id ${id} not found`);
    }
    return foundClass;
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const updatedClass = await this.classModel.findByIdAndUpdate(id, updateClassDto, { new: true }).exec();
  if (!updatedClass) {
    throw new NotFoundException(`Class with id ${id} not found`);
  }
  return updatedClass;
}

  remove(id: string): Promise<void> {
    return this.classModel.findByIdAndDelete(id).then(() => undefined);
  }

  // Ortalama hesaplama fonksiyonu
  async getClassAverage(classId: string): Promise<number | null> {
    // O sınıfa ait öğrencileri getir
    const students = await this.studentModel.find({ class: new Types.ObjectId(classId) }).exec();

    if (!students || students.length === 0) {
      return null;
    }

    let totalScore = 0;
    let count = 0;

    for (const student of students) {
      for (const note of student.notes) {
        totalScore += note.score;
        count++;
      }
    }

    if (count === 0) return null;

    const average = totalScore / count;
    return parseFloat(average.toFixed(2)); // 2 ondalık basamakla
  }

  
}
