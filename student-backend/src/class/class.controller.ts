/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './class.schema';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Class> {
    return this.classService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto): Promise<Class> {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.classService.remove(id);
  }

  @Get(':id/average')
  async getClassAverage(@Param('id') id: string): Promise<{ classId: string; average: number }> {
    const average = await this.classService.getClassAverage(id);
    if (average === null) {
      throw new NotFoundException('Bu sınıfa ait ortalama bulunamadı.');
    }
    return { classId: id, average };
  }

  

}
