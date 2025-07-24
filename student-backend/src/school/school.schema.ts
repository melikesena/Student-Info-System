/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SchoolDocument = School & Document;

@Schema()
export class School {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Class' }], default: [] })
  classes: Types.ObjectId[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);
