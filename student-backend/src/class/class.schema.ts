/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { School } from '../school/school.schema';

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop({ required: true })
  className: string;

  @Prop({ type: Types.ObjectId, ref: School.name, required: true })
  school: Types.ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
