import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from './pages/ReportPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [searchQuery, setSearchQuery] = useState('');

  switch (page) {
    case 'login':
      return <LoginPage onNavigate={setPage} />;
    case 'register':
      return <RegisterPage onNavigate={setPage} />;
    case 'dashboard':
      return <DashboardPage onNavigate={setPage} onSearch={setSearchQuery} />;
    case 'report':
      return <ReportPage onNavigate={setPage} query={searchQuery} />;
    default:
      return <LandingPage onNavigate={setPage} />;
  }
}