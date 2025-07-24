  import { Routes, Route } from 'react-router-dom';
import StudentGrades from './pages/StudentGrades';
import ClassAverages from './pages/ClassAverages';
import SchoolAverages from './pages/SchoolAverages';
import CourseResults from './pages/CourseResults';
import CourseSorted from './pages/CourseSorted';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CourseResultsHome from './pages/CourseResultsHome';
import CourseSortedHome from './pages/CourseSortedHome';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-grades" element={<StudentGrades />} />
        <Route path="/class-averages" element={<ClassAverages />} />
        <Route path="/school-averages" element={<SchoolAverages />} />
        {/* course-results için ana sayfa */}
        <Route path="/course-results" element={<CourseResultsHome />} />
        <Route path="/course-results/:courseId/:classId" element={<CourseResults />} />

        {/* course-sorted için ana sayfa ve sıralı liste */}
        <Route path="/course-sorted" element={<CourseSortedHome />} />
        <Route path="/course-sorted/:courseId" element={<CourseSorted />} />
      </Routes>
    </>
  );
}

export default App;
