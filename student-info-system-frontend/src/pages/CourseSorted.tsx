import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

interface Note {
  course: string;
  score: number;
}

interface Student {
  _id: string;
  name: string;
  notes: Note[];
}

const CourseSorted: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();  // classId kaldırıldı, backend ile uyumlu
  const [searchParams] = useSearchParams();
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setError("Eksik parametreler.");
      setLoading(false);
      return;
    }

    const fetchSortedStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/course/${courseId}/sorted?order=${order}`
        );
        setStudents(response.data);
        setError(null);
      } catch {
        setError("Veriler alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchSortedStudents();
  }, [courseId, order]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>
        Ders Bazlı Öğrenci Notlarına Göre Sıralama ({order === "asc" ? "Artan" : "Azalan"})
      </h2>
      {students.length === 0 ? (
        <p>Öğrenci bulunamadı.</p>
      ) : (
        <ul>
          {students.map((student) => {
            const note = student.notes.find((n) => n.course === courseId);
            return (
              <li key={student._id}>
                {student.name} - Not: {note ? note.score : "-"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CourseSorted;
