import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface School {
  _id: string;
  name: string;
}

interface SchoolAverage {
  schoolId: string;
  name: string;
  average: number | null;
}

const SchoolAverages: React.FC = () => {
  const [averages, setAverages] = useState<SchoolAverage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const schoolsRes = await axios.get('http://localhost:3000/school');
        const schools: School[] = schoolsRes.data;

        const averagesPromises = schools.map(async (school) => {
          try {
            const avgRes = await axios.get(`http://localhost:3000/school/${school._id}/average`);
            return {
              schoolId: school._id,
              name: school.name,
              average: avgRes.data.average,
            };
          } catch {
            return {
              schoolId: school._id,
              name: school.name,
              average: null,
            };
          }
        });

        const averagesData = await Promise.all(averagesPromises);
        setAverages(averagesData);
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAverages();
  }, []);

  return (
    <div>
      <h1>Okul Ortalamaları</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Okul</th>
              <th>Ortalama</th>
            </tr>
          </thead>
          <tbody>
            {averages.map(({ schoolId, name, average }) => (
              <tr key={schoolId}>
                <td>{name}</td>
                <td>{average !== null ? average.toFixed(2) : 'Ortalama yok'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SchoolAverages;
