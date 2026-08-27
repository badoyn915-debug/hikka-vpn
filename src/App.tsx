import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LocationsSection } from './components/LocationsSection';
import { ProtocolsSection } from './components/ProtocolsSection';
import { LiveStatusSection } from './components/LiveStatusSection';
import { FeaturesSection } from './components/FeaturesSection';
import { TelegramSection } from './components/TelegramSection';
import { TariffsSection } from './components/TariffsSection';
import { FaqSection } from './components/FaqSection';
import { CheckoutModal } from './components/modals/CheckoutModal';
import { QrCodeModal } from './components/modals/QrCodeModal';
import { SpeedtestModal } from './components/modals/SpeedtestModal';
import { ToastContainer } from './components/ui/Toast';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-white/20 selection:text-white">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <LocationsSection />
        <ProtocolsSection />
        <LiveStatusSection />
        <FeaturesSection />
        <TelegramSection />
        <TariffsSection />
        <FaqSection />
      </main>

      <Footer />

      {/* Global Modals */}
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
