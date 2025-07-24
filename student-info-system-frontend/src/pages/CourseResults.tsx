import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CourseResults.css';

interface Note {
  course: string;
  score: number;
}

interface Student {
  _id: string;
  name: string;
  notes: Note[];
}

const CourseResults: React.FC = () => {
  const { courseId, classId } = useParams<{ courseId: string; classId?: string }>();

  const [passedStudents, setPassedStudents] = useState<Student[]>([]);
  const [failedStudents, setFailedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError('Geçersiz parametreler.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Eğer classId varsa sınıflı endpoint, yoksa sınıfsız endpoint çağrısı yap
        const url = classId
          ? `http://localhost:3000/course/${courseId}/class/${classId}/passfail`
          : `http://localhost:3000/course-results/${courseId}/passfail`;

        const response = await axios.get(url);

        setPassedStudents(response.data.passed);
        setFailedStudents(response.data.failed);
        setError(null);
      } catch (err) {
        setError('Veriler alınırken hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, classId]);

  const getStudentScore = (student: Student) => {
    const note = student.notes.find((n) => n.course === courseId);
    return note ? note.score : '-';
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Ders Sonuçları</h2>

      <h3>Geçen Öğrenciler (Not ≥ 50)</h3>
      {passedStudents.length === 0 ? (
        <p>Geçen öğrenci yok.</p>
      ) : (
        <ul>
          {passedStudents.map((student) => (
            <li key={student._id}>
              {student.name} - Not: {getStudentScore(student)}
            </li>
          ))}
        </ul>
      )}

      <h3>Kalan Öğrenciler (Not &lt; 50)</h3>
      {failedStudents.length === 0 ? (
        <p>Kalan öğrenci yok.</p>
      ) : (
        <ul>
          {failedStudents.map((student) => (
            <li key={student._id}>
              {student.name} - Not: {getStudentScore(student)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseResults;
