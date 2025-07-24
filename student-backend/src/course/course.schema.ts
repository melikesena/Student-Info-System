/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Class } from '../class/class.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  courseName: string;

  @Prop()
  teacherName: string;

  @Prop({ type: Types.ObjectId, ref: Class.name})
  class: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
