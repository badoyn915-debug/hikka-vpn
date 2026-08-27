import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ServerLocation, 
  ProtocolInfo, 
  TariffPlan, 
  NetworkStatusTelemetry, 
  UserProfile, 
  CurrencyType 
} from '../types/vpn';
import { vpnApi } from '../api/vpnApi';
import { INITIAL_SERVERS, INITIAL_PROTOCOLS, INITIAL_TARIFFS, INITIAL_STATUS_TELEMETRY, INITIAL_USER_PROFILE } from '../api/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  currency: CurrencyType;
  setCurrency: (curr: CurrencyType) => void;
  
  servers: ServerLocation[];
  protocols: ProtocolInfo[];
  tariffs: TariffPlan[];
  statusTelemetry: NetworkStatusTelemetry;
  userProfile: UserProfile;
  isLoadingData: boolean;

  isConnected: boolean;
  isConnecting: boolean;
  selectedServer: ServerLocation;
  selectedProtocol: ProtocolInfo;
  connectedServer: ServerLocation | null;
  assignedIp: string;
  connectionDuration: number;
  liveDownloadMbps: number;
  liveUploadMbps: number;

  setSelectedServer: (server: ServerLocation) => void;
  setSelectedProtocol: (protocol: ProtocolInfo) => void;
  toggleConnect: () => Promise<void>;
  disconnectVPN: () => Promise<void>;
  testServerPing: (serverId: string) => Promise<number>;
  removeUserDevice: (deviceId: string) => Promise<void>;
  
  checkoutPlan: TariffPlan | null;
  setCheckoutPlan: (plan: TariffPlan | null) => void;
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
  isSpeedtestOpen: boolean;
  setIsSpeedtestOpen: (open: boolean) => void;
  activeConfigServer: ServerLocation | null;
  setActiveConfigServer: (server: ServerLocation | null) => void;

  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [currency, setCurrency] = useState<CurrencyType>('RUB');

  const [servers, setServers] = useState<ServerLocation[]>(INITIAL_SERVERS);
  const [protocols, setProtocols] = useState<ProtocolInfo[]>(INITIAL_PROTOCOLS);
  const [tariffs, setTariffs] = useState<TariffPlan[]>(INITIAL_TARIFFS);
  const [statusTelemetry, setStatusTelemetry] = useState<NetworkStatusTelemetry>(INITIAL_STATUS_TELEMETRY);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [selectedServer, setSelectedServer] = useState<ServerLocation>(INITIAL_SERVERS[2]);
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolInfo>(INITIAL_PROTOCOLS[0]);
  const [connectedServer, setConnectedServer] = useState<ServerLocation | null>(null);
  const [assignedIp, setAssignedIp] = useState<string>('');
  const [connectionDuration, setConnectionDuration] = useState<number>(0);
  const [liveDownloadMbps, setLiveDownloadMbps] = useState<number>(0);
  const [liveUploadMbps, setLiveUploadMbps] = useState<number>(0);

  const [checkoutPlan, setCheckoutPlan] = useState<TariffPlan | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [isSpeedtestOpen, setIsSpeedtestOpen] = useState<boolean>(false);
  const [activeConfigServer, setActiveConfigServer] = useState<ServerLocation | null>(null);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [srvs, prots, tarfs, status, user] = await Promise.all([
          vpnApi.getServers(),
          vpnApi.getProtocols(),
          vpnApi.getTariffs(),
          vpnApi.getNetworkStatus(),
          vpnApi.getUserProfile()
        ]);
        setServers(srvs);
        setProtocols(prots);
        setTariffs(tarfs);
        setStatusTelemetry(status);
        setUserProfile(user);
      } catch (err) {
        console.error('Failed to load API data:', err);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedStatus = await vpnApi.getNetworkStatus();
        setStatusTelemetry(updatedStatus);
      } catch (e) {
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer: any;
    let speedInterval: any;

    if (isConnected) {
      timer = setInterval(() => {
        setConnectionDuration((prev) => prev + 1);
      }, 1000);

      speedInterval = setInterval(() => {
        const baseDl = 320 + Math.random() * 420;
        const baseUl = 85 + Math.random() * 190;
        setLiveDownloadMbps(Math.round(baseDl * 10) / 10);
        setLiveUploadMbps(Math.round(baseUl * 10) / 10);
      }, 2000);
    } else {
      setConnectionDuration(0);
      setLiveDownloadMbps(0);
      setLiveUploadMbps(0);
    }

    return () => {
      clearInterval(timer);
      clearInterval(speedInterval);
    };
  }, [isConnected]);

  const toggleConnect = async () => {
    if (isConnected) {
      await disconnectVPN();
    } else {
      setIsConnecting(true);
      try {
        const res = await vpnApi.connect(selectedServer.id, selectedProtocol.id);
        if (res.success) {
          setIsConnected(true);
          setConnectedServer(selectedServer);
          setAssignedIp(res.ip);
          showToast(
            'VPN Подключен',
            `Защищённое соединение установлено через ${selectedServer.city} (${selectedProtocol.name})`,
            'success'
          );
        }
      } catch (e) {
        showToast('Ошибка подключения', 'Не удалось связаться с выбранным узлом', 'error');
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const disconnectVPN = async () => {
    setIsConnecting(true);
    try {
      await vpnApi.disconnect();
      setIsConnected(false);
      setConnectedServer(null);
      setAssignedIp('');
      showToast('VPN Отключен', 'Туннель закрыт. Трафик идёт через вашего провайдера', 'info');
    } catch (e) {
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const testServerPing = async (serverId: string): Promise<number> => {
    try {
      const res = await vpnApi.pingServer(serverId);
      setServers((prev) =>
        prev.map((s) => (s.id === serverId ? { ...s, ping: res.ping } : s))
      );
      return res.ping;
    } catch (e) {
      return 99;
    }
  };

  const removeUserDevice = async (deviceId: string) => {
    try {
      const updated = await vpnApi.removeDevice(deviceId);
      setUserProfile((prev) => ({
        ...prev,
        devices: updated,
        subscription: {
          ...prev.subscription,
          activeDevicesCount: updated.length
        }
      }));
      showToast('Устройство удалено', 'Сессия устройства была успешно завершена', 'info');
    } catch (e) {
      showToast('Ошибка', 'Не удалось удалить устройство', 'error');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currency,
        setCurrency,
        servers,
        protocols,
        tariffs,
        statusTelemetry,
        userProfile,
        isLoadingData,
        isConnected,
        isConnecting,
        selectedServer,
        selectedProtocol,
        connectedServer,
        assignedIp,
        connectionDuration,
        liveDownloadMbps,
        liveUploadMbps,
        setSelectedServer,
        setSelectedProtocol,
        toggleConnect,
        disconnectVPN,
        testServerPing,
        removeUserDevice,
        checkoutPlan,
        setCheckoutPlan,
        isQrModalOpen,
        setIsQrModalOpen,
        isSpeedtestOpen,
        setIsSpeedtestOpen,
        activeConfigServer,
        setActiveConfigServer,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
