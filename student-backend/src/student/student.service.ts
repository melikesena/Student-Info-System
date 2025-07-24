/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Student, StudentDocument } from './student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find()
      .populate('class')
      .populate('notes.course')
      .exec();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id)
      .populate('class')
      .populate('notes.course')
      .exec();

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true })
      .populate('class')
      .populate('notes.course')
      .exec();

    if (!updatedStudent) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return updatedStudent;
  }

  async remove(id: string): Promise<void> {
    const result = await this.studentModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
  }

  async getGradesByTc(tc: string) {
    try {
      const student = await this.studentModel.findOne({ tc })
        .populate('notes.course')
        .exec();

      if (!student) {
        throw new NotFoundException(`Student with TC ${tc} not found`);
      }

      const grades = student.notes.map(note => {
        const course = note.course as { courseName?: string; name?: string } | null | undefined;
        const courseName = course?.courseName ?? course?.name ?? 'Unknown';
        return {
          courseName,
          score: note.score,
        };
      });

      return {
        studentName: student.name,
        tc: student.tc,
        grades,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('getGradesByTc error:', error.message);
      } else {
        console.error('getGradesByTc unknown error:', error);
      }
      throw error;
    }
  }

  async updateGrades(id: string, grades: { course: string; score: number }[]): Promise<Student> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    student.notes = grades.map(grade => ({
      course: new Types.ObjectId(grade.course),
      score: grade.score,
    })) as typeof student.notes;
    return student.save();
  }
}
