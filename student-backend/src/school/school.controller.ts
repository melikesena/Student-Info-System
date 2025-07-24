/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School } from './school.schema';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  findAll(): Promise<School[]> {
    return this.schoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<School> {
    return this.schoolService.findOne(id);
  }

  @Get(':id/average')
  async getSchoolAverage(@Param('id') id: string): Promise<{ schoolId: string; average: number }> {
    const average = await this.schoolService.getSchoolAverage(id);
    if (average === null) {
      throw new NotFoundException('Bu okula ait ortalama bulunamadı.');
    }
    return { schoolId: id, average };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ): Promise<School> {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.schoolService.remove(id);
  }
}
