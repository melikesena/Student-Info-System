import { useState } from "react";
import { getStudentGradesByTc } from "../api/student";
import "./StudentGrades.css";

interface Grade {
  courseName: string;
  score: string | number;
}

const StudentGrades = () => {
  const [tc, setTc] = useState("");
  const [grades, setGrades] = useState<Grade[] | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setGrades(null);
    setStudentName(null);

    try {
      const result = await getStudentGradesByTc(tc);
      console.log("API'den gelen sonuç:", result);

      if (!result || !result.grades || result.grades.length === 0) {
        setError("Öğrenci bulunamadı veya not bilgisi yok.");
        return;
      }

      setGrades(result.grades);
      setStudentName(result.studentName);
    } catch (err) {
      console.error("API çağrısında hata:", err);
      setError("Veri alınırken bir hata oluştu.");
    }
  };

  return (
    <div className="grade-container">
      <input
        type="text"
        placeholder="TC Kimlik Numarası"
        value={tc}
        onChange={(e) => setTc(e.target.value)}
        className="grade-input"
      />
      <button onClick={handleSearch}>Sorgula</button>

      {error && <p className="grade-error">{error}</p>}

      {studentName && <h3>Öğrenci: {studentName}</h3>}

      {grades && grades.length > 0 && (
        <ul className="grade-list">
          {grades.map((g, index) => (
            <li key={index}>
              {g.courseName}: {g.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentGrades;
