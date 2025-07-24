import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Course {
  _id: string;
  courseName: string;
}

interface Props {
  classId: string;
}

const CourseList: React.FC<Props> = ({ classId }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/course')
      .then(res => {
        setCourses(res.data);
        setError(null);
      })
      .catch(() => setError('Dersler yüklenirken hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Dersler Listesi</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/course-results/${course._id}/${classId}`}>
              {course.courseName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
