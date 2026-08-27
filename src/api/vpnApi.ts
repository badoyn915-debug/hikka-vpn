import { 
  ServerLocation, 
  ProtocolInfo, 
  TariffPlan, 
  NetworkStatusTelemetry, 
  UserProfile, 
  ConnectedDevice 
} from '../types/vpn';
import { 
  INITIAL_SERVERS, 
  INITIAL_PROTOCOLS, 
  INITIAL_TARIFFS, 
  INITIAL_STATUS_TELEMETRY, 
  INITIAL_USER_PROFILE 
} from './mockData';

// Simulated delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class VpnApiService {
  private servers: ServerLocation[] = [...INITIAL_SERVERS];
  private protocols: ProtocolInfo[] = [...INITIAL_PROTOCOLS];
  private tariffs: TariffPlan[] = [...INITIAL_TARIFFS];
  private statusTelemetry: NetworkStatusTelemetry = { ...INITIAL_STATUS_TELEMETRY };
  private userProfile: UserProfile = { ...INITIAL_USER_PROFILE };

  /**
   * Fetch list of all VPN server locations
   */
  async getServers(): Promise<ServerLocation[]> {
    await delay(200);
    // Add realistic subtle jitter to pings on fetch
    return this.servers.map((srv) => ({
      ...srv,
      ping: Math.max(2, Math.round(srv.ping + (Math.random() * 4 - 2))),
      loadPercent: Math.min(95, Math.max(10, Math.round(srv.loadPercent + (Math.random() * 6 - 3))))
    }));
  }

  /**
   * Test live ping to a specific server
   */
  async pingServer(serverId: string): Promise<{ serverId: string; ping: number; status: string }> {
    const srv = this.servers.find((s) => s.id === serverId);
    const basePing = srv ? srv.ping : 25;
    await delay(350 + Math.random() * 200);
    const calculatedPing = Math.max(2, Math.round(basePing + (Math.random() * 5 - 2)));
    return {
      serverId,
      ping: calculatedPing,
      status: calculatedPing < 50 ? 'optimal' : 'online'
    };
  }

  /**
   * Fetch list of supported protocols
   */
  async getProtocols(): Promise<ProtocolInfo[]> {
    await delay(150);
    return this.protocols;
  }

  /**
   * Fetch tariffs
   */
  async getTariffs(): Promise<TariffPlan[]> {
    await delay(150);
    return this.tariffs;
  }

  /**
   * Fetch real-time telemetry and network health
   */
  async getNetworkStatus(): Promise<NetworkStatusTelemetry> {
    await delay(180);
    // Generate slight live fluctuations in traffic & latency
    const jitterLatency = Number((28.0 + (Math.random() * 1.5 - 0.75)).toFixed(1));
    const currentTraffic = Number((84.0 + (Math.random() * 5.0 - 2.5)).toFixed(1));

    return {
      ...this.statusTelemetry,
      averageLatency: jitterLatency,
      currentTrafficGbps: currentTraffic,
      lastUpdated: 'только что'
    };
  }

  /**
   * Fetch user dashboard profile
   */
  async getUserProfile(): Promise<UserProfile> {
    await delay(250);
    return this.userProfile;
  }

  /**
   * Connect to VPN tunnel
   */
  async connect(serverId: string, protocolId: string): Promise<{
    success: boolean;
    ip: string;
    assignedNode: string;
    connectedAt: string;
    sessionToken: string;
  }> {
    await delay(900); // realistic handshake delay
    const srv = this.servers.find((s) => s.id === serverId) || this.servers[2];
    return {
      success: true,
      ip: `185.220.${Math.floor(Math.random() * 250) + 1}.${Math.floor(Math.random() * 250) + 1}`,
      assignedNode: `${srv.city}, ${srv.country} (${srv.code})`,
      connectedAt: new Date().toISOString(),
      sessionToken: 'hk_sess_' + Math.random().toString(36).substring(2, 15)
    };
  }

  /**
   * Disconnect VPN tunnel
   */
  async disconnect(): Promise<{ success: boolean }> {
    await delay(400);
    return { success: true };
  }

  /**
   * Remove a connected device
   */
  async removeDevice(deviceId: string): Promise<ConnectedDevice[]> {
    await delay(300);
    this.userProfile.devices = this.userProfile.devices.filter((d) => d.id !== deviceId);
    this.userProfile.subscription.activeDevicesCount = this.userProfile.devices.length;
    return this.userProfile.devices;
  }

  /**
   * Simulate tariff purchase
   */
  async purchaseTariff(planId: string, paymentMethod: string): Promise<{
    success: boolean;
    orderId: string;
    subscriptionKey: string;
    botRedirectUrl: string;
  }> {
    await delay(1200);
    return {
      success: true,
      orderId: 'HK-ORD-' + Math.floor(100000 + Math.random() * 900000),
      subscriptionKey: 'vless://' + Math.random().toString(36).substring(2, 15) + '@ams01.hikkavpn.net:443?security=reality&sni=dl.google.com#HikkaVPN-VIP',
      botRedirectUrl: 'https://t.me/HikkaVPNbot?start=order_paid_' + planId
    };
  }
}

export const vpnApi = new VpnApiService();
