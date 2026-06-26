import { useState, useCallback } from 'react';
import Nav from './components/Nav';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import TeamPage from './components/pages/TeamPage';
import InvestorsPage from './components/pages/InvestorsPage';
import ApplyPage from './components/pages/ApplyPage';
import { useScrollFade } from './hooks/useScrollFade';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const showPage = useCallback((id) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useScrollFade(activePage);

  return (
    <>
      <Nav activePage={activePage} onNavigate={showPage} />

      <HomePage isActive={activePage === 'home'} onNavigate={showPage} />
      <AboutPage isActive={activePage === 'about'} />
      <TeamPage isActive={activePage === 'team'} />
      <InvestorsPage isActive={activePage === 'investors'} onNavigate={showPage} />
      <ApplyPage isActive={activePage === 'apply'} />
    </>
  );
}
