/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Student, StudentDocument } from '../student/student.schema';


@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().populate('class').exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).populate('class').exec();
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const updatedCourse = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).populate('class').exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return updatedCourse;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
  }
 async getPassFailByCourse(courseId: string): Promise<{ passed: StudentDocument[]; failed: StudentDocument[] }> {
  const courseObjectId = new Types.ObjectId(courseId);

  // Tüm öğrencileri çekiyoruz (sınıf filtresi yok)
  const students = await this.studentModel.find().lean();

  // Notları filtrele ve geçip/kalmalarına göre ayır
  const passed: StudentDocument[] = [];
  const failed: StudentDocument[] = [];

  for (const student of students) {
    const note = student.notes.find(n => n.course.toString() === courseObjectId.toString());
    if (note) {
      if (note.score >= 50) {
        passed.push(student);
      } else {
        failed.push(student);
      }
    }
  }

  return { passed, failed };
}


 async getStudentsSortedByCourseScore(courseId: string, sortOrder: 'asc' | 'desc' = 'desc'): Promise<StudentDocument[]> {
  const courseObjectId = new Types.ObjectId(courseId);

  // Tüm öğrencileri çek (sınıf filtresi yok)
  const students = await this.studentModel.find().lean();

  // Sadece o derse ait notu olanları filtrele
  const filteredStudents = students.filter(student =>
    student.notes.some(note => note.course.toString() === courseObjectId.toString())
  );

  // Sıralama
  filteredStudents.sort((a, b) => {
    const noteA = a.notes.find(note => note.course.toString() === courseObjectId.toString());
    const noteB = b.notes.find(note => note.course.toString() === courseObjectId.toString());
    if (!noteA || !noteB) return 0;
    return sortOrder === 'asc' ? noteA.score - noteB.score : noteB.score - noteA.score;
  });

  return filteredStudents;
}

 
  
}
