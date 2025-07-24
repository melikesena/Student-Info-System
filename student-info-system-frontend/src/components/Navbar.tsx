// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Eğer CSS dosyası varsa ekle

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/student-grades">Not Sorgula</Link></li>
        <li><Link to="/class-averages">Sınıf Ortalamaları</Link></li>
        <li><Link to="/school-averages">Okul Ortalaması</Link></li>
        <li><Link to="/course-results">Ders Durumları</Link></li>
        <li><Link to="/course-sorted">Not Sıralaması</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
