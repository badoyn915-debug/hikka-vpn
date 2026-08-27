import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LocationsSection } from './components/LocationsSection';
import { ProtocolsSection } from './components/ProtocolsSection';
import { LiveStatusSection } from './components/LiveStatusSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TelegramSection } from './components/TelegramSection';
import { TariffsSection } from './components/TariffsSection';
import { FaqSection } from './components/FaqSection';
import { DashboardView } from './components/DashboardView';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { QrCodeModal } from './components/modals/QrCodeModal';
import { SpeedtestModal } from './components/modals/SpeedtestModal';
import { ToastContainer } from './components/ui/Toast';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <main className="flex-grow">
        {currentView === 'landing' ? (
          <>
            <Hero />
            <LocationsSection />
            <ProtocolsSection />
            <LiveStatusSection />
            <FeaturesSection />
            <TelegramSection />
            <TariffsSection />
            <FaqSection />
          </>
        ) : (
          <DashboardView />
        )}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <CheckoutModal />
      <QrCodeModal />
      <SpeedtestModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
