import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';

import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import StudyTwin from './views/StudyTwin';
import AiTutor from './views/AiTutor';
import MyMaterials from './views/MyMaterials';
import ExamMode from './views/ExamMode';
import RapidQuiz from './views/RapidQuiz';
import Progress from './views/Progress';
import SnapdragonAi from './views/SnapdragonAi';
import OfflineMode from './views/OfflineMode';
import Settings from './views/Settings';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    const commonProps = {
      onNavigate: setCurrentView,
      selectedSubject,
      onSelectSubject: setSelectedSubject,
    };

    switch (currentView) {
      case 'landing':
        return <LandingPage {...commonProps} />;
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'study-twin':
        return <StudyTwin {...commonProps} />;
      case 'ai-tutor':
        return <AiTutor {...commonProps} />;
      case 'my-materials':
        return <MyMaterials {...commonProps} />;
      case 'exam-mode':
        return <ExamMode {...commonProps} />;
      case 'rapid-quiz':
        return <RapidQuiz {...commonProps} />;
      case 'progress':
        return <Progress {...commonProps} />;
      case 'snapdragon-ai':
        return <SnapdragonAi {...commonProps} />;
      case 'offline-mode':
        return <OfflineMode {...commonProps} />;
      case 'settings':
        return <Settings {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md text-body-md antialiased selection:bg-primary/20 selection:text-primary">
      {/* Precision Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenSearch={() => setIsSearchOpen(true)}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area offset by Sidebar */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Global Precision Header */}
        <Header
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        />

        {/* Dynamic Route View with top padding for fixed header */}
        <main className="w-full pt-16 flex-1 bg-surface flex flex-col">
          {renderView()}
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={setIsSearchOpen}
        onNavigate={setCurrentView}
      />
    </div>
  );
}
