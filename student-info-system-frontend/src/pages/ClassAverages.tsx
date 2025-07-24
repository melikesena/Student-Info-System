import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Class {
  _id: string;
  className: string;
}

interface ClassAverage {
  className: string;
  average: number | null;
  classId: string;
}

const ClassAverages: React.FC = () => {
  const [averages, setAverages] = useState<ClassAverage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const classesRes = await axios.get('http://localhost:3000/class');
        const classes: Class[] = classesRes.data;

        const averagesPromises = classes.map(async (cls: Class) => {
          try {
            const avgRes = await axios.get(`http://localhost:3000/class/${cls._id}/average`);
            return {
              classId: cls._id,
              className: cls.className,
              average: avgRes.data.average,
            };
          } catch {
            return {
              classId: cls._id,
              className: cls.className,
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
    <div className="class-averages-container">
      <h1>Sınıf Ortalamaları</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sınıf</th>
              <th>Ortalama</th>
            </tr>
          </thead>
          <tbody>
            {averages.map((item) => (
              <tr key={item.classId}>
                <td>{item.className}</td>
                <td>{item.average !== null ? item.average.toFixed(2) : 'Ortalama yok'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassAverages;
