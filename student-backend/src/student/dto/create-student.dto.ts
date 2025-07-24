/* eslint-disable prettier/prettier */
export class CreateStudentDto {
  readonly name: string;
  readonly tc: string;
  readonly class: string; // classId
  readonly notes?: {
    course: string; // courseId
    score: number;
  }[];
}
