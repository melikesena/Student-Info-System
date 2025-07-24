import React from "react";
import { useNavigate } from "react-router-dom";

const CourseSortedHome: React.FC = () => {
  const navigate = useNavigate();

  const courses = [
    { courseId: "688111a80892e65f979c2f68", name: "Matematik" },
    { courseId: "68811a9dc12e0e37d96cddc0", name: "Fizik" },
  ];

  const handleClick = (courseId: string) => {
    navigate(`/course-sorted/${courseId}?order=desc`);
  };

  return (
    <div>
      <h2>Lütfen Bir Ders Seçiniz (Sıralı Liste)</h2>
      {courses.map(({ courseId, name }) => (
        <button
          key={courseId}
          onClick={() => handleClick(courseId)}
          className="course-button"
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default CourseSortedHome;
