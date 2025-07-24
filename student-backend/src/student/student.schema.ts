/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Class } from "../class/class.schema";
import { Course } from "../course/course.schema";

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    tc: string;

    @Prop({ type: Types.ObjectId, ref: Class.name, required: true })
    class: Types.ObjectId;

    @Prop({
      type: [
        {
          course: { type: Types.ObjectId, ref: Course.name },
          score: Number,
        }
      ],
      default: [],
    })
    notes: { course: Types.ObjectId; score: number }[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
