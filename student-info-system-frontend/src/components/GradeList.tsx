import React from "react";

type Grade = {
  courseName: string;
  score: number;
};

type Props = {
  grades: Grade[];
};

const GradeList: React.FC<Props> = ({ grades }) => {
  return (
    <ul>
      {grades.map((grade, index) => (
        <li key={index}>
          {grade.courseName} - {grade.score}
        </li>
      ))}
    </ul>
  );
};

export default GradeList;
