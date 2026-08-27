export type RegionCategory = 'all' | 'europe' | 'russia' | 'asia_usa';

export interface ServerLocation {
  id: string;
  country: string;
  city: string;
  flag: string;
  code: string;
  region: 'europe' | 'russia' | 'asia_usa';
  status: 'online' | 'maintenance' | 'optimal';
  ping: number; // in ms
  loadPercent: number; // 0-100
  bandwidth: string; // e.g. "10 Gbps"
  protocols: string[];
  isSpecialRussia?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export interface ProtocolInfo {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  securityRating: number; // 0-100
  speedRating: number; // 0-100
  stabilityRating: number; // 0-100
  antiDpiRating: number; // 0-100
  encryption: string;
  port: string;
  badges: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export type CurrencyType = 'RUB' | 'USDT' | 'TON' | 'STARS';

export interface TariffPlan {
  id: string;
  title: string;
  durationMonths: number;
  pricePerMonth: Record<CurrencyType, number>;
  totalPrice: Record<CurrencyType, number>;
  discountPercent?: number;
  isPopular?: boolean;
  badge?: string;
  features: string[];
}

export interface NetworkStatusTelemetry {
  status: 'operational' | 'degraded' | 'maintenance';
  statusText: string;
  totalServers: number;
  activeServers: number;
  averageLatency: number; // ms
  uptime: number; // e.g. 99.98
  totalBandwidthTbps: number;
  currentTrafficGbps: number;
  packetLoss: number; // %
  lastUpdated: string;
  trafficHistory: {
    time: string;
    trafficGbps: number;
    latencyMs: number;
  }[];
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'iphone' | 'android' | 'macos' | 'windows' | 'linux' | 'router';
  ip: string;
  lastActive: string;
  trafficUsedGb: number;
  location: string;
}

export interface UserSubscription {
  status: 'active' | 'expired' | 'trial';
  planName: string;
  expiresAt: string;
  daysRemaining: number;
  maxDevices: number;
  activeDevicesCount: number;
  trafficLimitGb: number | 'unlimited';
  trafficUsedGb: number;
  autoRenew: boolean;
  subscriptionKey: string;
}

export interface UserProfile {
  id: string;
  telegramUsername: string;
  telegramId: string;
  avatarUrl?: string;
  joinedDate: string;
  subscription: UserSubscription;
  devices: ConnectedDevice[];
}

export interface TelegramBotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  buttons?: {
    text: string;
    action: string;
  }[][];
  qrPreview?: boolean;
}
