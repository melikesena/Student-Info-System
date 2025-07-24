import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseResultsHome: React.FC = () => {
  const navigate = useNavigate();

  // Örnek veriler
  const courses = [
    { courseId: '688111a80892e65f979c2f68', classId: '68810f76b905786f7f256924', name: 'Matematik - Sınıf A' },
    { courseId: '688111a80892e65f979c2f69', classId: '68810f76b905786f7f256925', name: 'Fizik - Sınıf B' },
  ];

  return (
    <div>
      <h2>Lütfen Bir Ders ve Sınıf Seçiniz</h2>
      {courses.map(({ courseId, classId, name }) => (
        <button
          key={`${courseId}-${classId}`}
          onClick={() => navigate(`/course-results/${courseId}/${classId}`)}
          className="course-button"
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default CourseResultsHome;
