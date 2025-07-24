import axios from "axios";

export const getStudentGradesByTc = async (tc: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/student/grades?tc=${tc}`);
    return response.data;
  } catch (error) {
    console.error("Hata: ", error);
    return null;
  }
};
