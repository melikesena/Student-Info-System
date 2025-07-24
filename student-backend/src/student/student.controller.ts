/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Get('grades')
  async getGradesByTc(@Query('tc') tc: string) {
    return this.studentService.getGradesByTc(tc);
}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(id);
  }

@Patch(':id/grades')
async updateGrades(
  @Param('id') id: string,
  @Body('grades') grades: { course: string; score: number }[],
) {
  return await this.studentService.updateGrades(id, grades);
}


  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studentService.remove(id);
  }
}
