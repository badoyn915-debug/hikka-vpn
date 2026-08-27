import { ServerLocation, ProtocolInfo, TariffPlan, NetworkStatusTelemetry, UserProfile } from '../types/vpn';

export const INITIAL_SERVERS: ServerLocation[] = [
  {
    id: 'ru-msk-01',
    country: 'Россия',
    city: 'Москва',
    flag: '🇷🇺',
    code: 'RU-MSK',
    region: 'russia',
    status: 'optimal',
    ping: 4,
    loadPercent: 38,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'wireguard'],
    isSpecialRussia: true,
    coordinates: { lat: 55.7558, lng: 37.6173 },
    features: ['Full Work в РФ', 'Ультранизкий пинг', 'Кинопоиск & Госуслуги', 'Direct Peering']
  },
  {
    id: 'ru-spb-01',
    country: 'Россия',
    city: 'Санкт-Петербург',
    flag: '🇷🇺',
    code: 'RU-SPB',
    region: 'russia',
    status: 'online',
    ping: 8,
    loadPercent: 44,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks'],
    isSpecialRussia: true,
    coordinates: { lat: 59.9343, lng: 30.3351 },
    features: ['Full Work в РФ', 'Прямой маршрут SPB-IX', 'Локальные сервисы']
  },
  {
    id: 'nl-ams-01',
    country: 'Нидерланды',
    city: 'Амстердам',
    flag: '🇳🇱',
    code: 'NL-AMS',
    region: 'europe',
    status: 'optimal',
    ping: 18,
    loadPercent: 52,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'wireguard', 'trojan', 'hysteria'],
    coordinates: { lat: 52.3676, lng: 4.9041 },
    features: ['Европейский хаб #1', 'P2P / Торренты разрешены', 'Streaming 4K Ready', 'Zero-Logs']
  },
  {
    id: 'de-fra-01',
    country: 'Германия',
    city: 'Франкфурт',
    flag: '🇩🇪',
    code: 'DE-FRA',
    region: 'europe',
    status: 'optimal',
    ping: 22,
    loadPercent: 61,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'wireguard', 'hysteria'],
    coordinates: { lat: 50.1109, lng: 8.6821 },
    features: ['DE-CIX Backbone', 'Сверхстабильный канал', 'Анти-DDoS Core']
  },
  {
    id: 'pl-waw-01',
    country: 'Польша',
    city: 'Варшава',
    flag: '🇵🇱',
    code: 'PL-WAW',
    region: 'europe',
    status: 'online',
    ping: 16,
    loadPercent: 35,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'wireguard'],
    coordinates: { lat: 52.2297, lng: 21.0122 },
    features: ['Минимальный пинг из СНГ', 'Быстрый YouTube & Discord', 'P2P Friendly']
  },
  {
    id: 'ee-tll-01',
    country: 'Эстония',
    city: 'Таллин',
    flag: '🇪🇪',
    code: 'EE-TLL',
    region: 'europe',
    status: 'online',
    ping: 12,
    loadPercent: 29,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'hysteria'],
    coordinates: { lat: 59.437, lng: 24.7535 },
    features: ['Балтийский шлюз', 'Низкие задержки', 'Защищённый датацентр']
  },
  {
    id: 'fi-hel-01',
    country: 'Финляндия',
    city: 'Хельсинки',
    flag: '🇫🇮',
    code: 'FI-HEL',
    region: 'europe',
    status: 'online',
    ping: 14,
    loadPercent: 31,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'wireguard'],
    coordinates: { lat: 60.1699, lng: 24.9384 },
    features: ['Северный маршрут', 'Высокая приватность', 'Оптимизирован для стриминга']
  },
  {
    id: 'tr-ist-01',
    country: 'Турция',
    city: 'Стамбул',
    flag: '🇹🇷',
    code: 'TR-IST',
    region: 'europe',
    status: 'online',
    ping: 38,
    loadPercent: 49,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'trojan'],
    coordinates: { lat: 41.0082, lng: 28.9784 },
    features: ['Турецкие подписки и игры', 'Steam/PS Store/Spotify', 'Низкий пинг на Юге']
  },
  {
    id: 'se-sto-01',
    country: 'Швеция',
    city: 'Стокгольм',
    flag: '🇸🇪',
    code: 'SE-STO',
    region: 'europe',
    status: 'online',
    ping: 20,
    loadPercent: 26,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'wireguard', 'shadowsocks'],
    coordinates: { lat: 59.3293, lng: 18.0686 },
    features: ['Шведская юрисдикция', 'Zero Logs', 'Гигабитная симметрия']
  },
  {
    id: 'gb-lon-01',
    country: 'Великобритания',
    city: 'Лондон',
    flag: '🇬🇧',
    code: 'GB-LON',
    region: 'europe',
    status: 'online',
    ping: 28,
    loadPercent: 42,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'wireguard'],
    coordinates: { lat: 51.5074, lng: -0.1278 },
    features: ['BBC iPlayer Support', 'LINX Direct Routing', 'Финансовые сервисы']
  },
  {
    id: 'us-nyc-01',
    country: 'США',
    city: 'Нью-Йорк',
    flag: '🇺🇸',
    code: 'US-NYC',
    region: 'asia_usa',
    status: 'online',
    ping: 78,
    loadPercent: 55,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'shadowsocks', 'hysteria'],
    coordinates: { lat: 40.7128, lng: -74.006 },
    features: ['ChatGPT / Claude без ограничений', 'US Streaming Ready', 'Американский IP']
  },
  {
    id: 'sg-sin-01',
    country: 'Сингапур',
    city: 'Сингапур',
    flag: '🇸🇬',
    code: 'SG-SIN',
    region: 'asia_usa',
    status: 'online',
    ping: 125,
    loadPercent: 33,
    bandwidth: '10 Gbps',
    protocols: ['vless', 'hysteria', 'shadowsocks'],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    features: ['Азиатско-Тихоокеанский хаб', 'Игровые серверы Азии', 'Максимальная скорость']
  }
];

export const INITIAL_PROTOCOLS: ProtocolInfo[] = [
  {
    id: 'vless',
    name: 'VLESS + Reality',
    shortCode: 'VLESS XTLS',
    description: 'Передовой протокол с маскировкой под легитимный TLS 1.3 трафик доверенных сайтов. Полностью невидим для ТСПУ и систем DPI.',
    securityRating: 99,
    speedRating: 98,
    stabilityRating: 99,
    antiDpiRating: 100,
    encryption: 'XTLS-Vision (TLS 1.3 Handshake Mask)',
    port: '443 (HTTPS)',
    badges: ['FAST', 'STEALTH', 'ANTI-DPI', 'RECOMMENDED'],
    recommendedFor: 'Обход любых блокировок в РФ, мобильные операторы, максимальная скорость без потерь',
    isPopular: true
  },
  {
    id: 'shadowsocks',
    name: 'Shadowsocks 2022',
    shortCode: 'SS-2022',
    description: 'Новый стандарт легендарного протокола с блочным шифрованием AEAD и защитой от активного зондирования.',
    securityRating: 96,
    speedRating: 97,
    stabilityRating: 98,
    antiDpiRating: 94,
    encryption: '2022-blake3-chacha20-poly1305',
    port: 'Dynamic / Multi-port',
    badges: ['FAST', 'STABLE', 'LOW-PING'],
    recommendedFor: 'Онлайн-игры, низкие задержки, быстрый серфинг, роутеры Keenetic/MikroTik'
  },
  {
    id: 'wireguard',
    name: 'Amnezia WireGuard',
    shortCode: 'AWG / WG',
    description: 'Модифицированный высокопроизводительный протокол с добавлением мусорных пакетов (Junk Packets) для обхода фильтрации.',
    securityRating: 98,
    speedRating: 100,
    stabilityRating: 95,
    antiDpiRating: 92,
    encryption: 'ChaCha20-Poly1305 + Junk Obfuscation',
    port: '51820 UDP',
    badges: ['FAST', '10 GBPS', 'BATTERY-SAVING'],
    recommendedFor: 'Максимальная пропускная способность, загрузка больших файлов, стриминг в 4K/8K'
  },
  {
    id: 'hysteria',
    name: 'Hysteria 2',
    shortCode: 'HY2 QUIC',
    description: 'Протокол на базе модифицированного UDP/QUIC с алгоритмом Brutal Congestion Control. Не теряет скорость даже при 30% потерях пакетов.',
    securityRating: 95,
    speedRating: 99,
    stabilityRating: 97,
    antiDpiRating: 96,
    encryption: 'TLS 1.3 with Salamander Obfuscation',
    port: 'Multi-port UDP 1000-65535',
    badges: ['FAST', 'SECURE', 'ANTI-PACKET-LOSS'],
    recommendedFor: 'Нестабильный мобильный интернет (LTE/3G/Поезда), загруженные сети, публичный Wi-Fi'
  },
  {
    id: 'trojan',
    name: 'Trojan-GFW',
    shortCode: 'TROJAN',
    description: 'Протокол, имитирующий стандартное HTTPS веб-соединение до реального замаскированного веб-сервера.',
    securityRating: 97,
    speedRating: 94,
    stabilityRating: 97,
    antiDpiRating: 98,
    encryption: 'Native TLS 1.3 / OpenSSL',
    port: '443 (HTTPS)',
    badges: ['SECURE', 'STABLE', 'HTTPS CLOAK'],
    recommendedFor: 'Корпоративные сети, отели с жестким файрволом, альтернативный резервный канал'
  }
];

export const INITIAL_TARIFFS: TariffPlan[] = [
  {
    id: 'plan-1m',
    title: '1 Месяц',
    durationMonths: 1,
    pricePerMonth: {
      RUB: 190,
      USDT: 1.99,
      TON: 0.38,
      STARS: 99
    },
    totalPrice: {
      RUB: 190,
      USDT: 1.99,
      TON: 0.38,
      STARS: 99
    },
    features: [
      'Все 14+ локаций (включая РФ Full Work)',
      'Все протоколы (VLESS Reality, WireGuard, SS-2022)',
      'Скорость до 10 Gbps без ограничений',
      'До 5 устройств одновременно',
      'Zero-Logs & Полная анонимность',
      'Техподдержка в Telegram 24/7'
    ]
  },
  {
    id: 'plan-3m',
    title: '3 Месяца',
    durationMonths: 3,
    pricePerMonth: {
      RUB: 170,
      USDT: 1.79,
      TON: 0.34,
      STARS: 89
    },
    totalPrice: {
      RUB: 510,
      USDT: 5.37,
      TON: 1.02,
      STARS: 267
    },
    discountPercent: 10,
    features: [
      'Все возможности тарифа на 1 месяц',
      'Экономия 10%',
      'Приоритетный доступ к новым серверам',
      'Поддержка Smart Routing для РФ',
      'Мгновенная выдача ключей'
    ]
  },
  {
    id: 'plan-6m',
    title: '6 Месяцев',
    durationMonths: 6,
    pricePerMonth: {
      RUB: 150,
      USDT: 1.59,
      TON: 0.30,
      STARS: 79
    },
    totalPrice: {
      RUB: 900,
      USDT: 9.54,
      TON: 1.80,
      STARS: 474
    },
    discountPercent: 20,
    features: [
      'Все возможности тарифа на 3 месяца',
      'Экономия 20%',
      'До 7 устройств на аккаунт',
      'Автоматическое продление со скидкой',
      'VIP-приоритет в Telegram поддержке'
    ]
  },
  {
    id: 'plan-12m',
    title: '12 Месяцев',
    durationMonths: 12,
    pricePerMonth: {
      RUB: 120,
      USDT: 1.25,
      TON: 0.24,
      STARS: 62
    },
    totalPrice: {
      RUB: 1440,
      USDT: 15.00,
      TON: 2.88,
      STARS: 744
    },
    discountPercent: 37,
    isPopular: true,
    badge: 'ХИТ • ВЫГОДНЕЕ НА 37%',
    features: [
      'Все локации и протоколы без лимитов',
      'Максимальная выгода (всего 120 ₽/мес)',
      'До 10 устройств одновременно',
      'Выделенный канал с наименьшим пингом',
      'Персональный конфиг генератор',
      'Приоритетная поддержка 24/7'
    ]
  }
];

export const INITIAL_STATUS_TELEMETRY: NetworkStatusTelemetry = {
  status: 'operational',
  statusText: 'Все узлы сети функционируют в штатном режиме',
  totalServers: 24,
  activeServers: 24,
  averageLatency: 28.4,
  uptime: 99.98,
  totalBandwidthTbps: 240,
  currentTrafficGbps: 84.6,
  packetLoss: 0.0,
  lastUpdated: 'только что',
  trafficHistory: [
    { time: '10:00', trafficGbps: 62.1, latencyMs: 27.8 },
    { time: '10:05', trafficGbps: 68.4, latencyMs: 28.1 },
    { time: '10:10', trafficGbps: 74.2, latencyMs: 28.3 },
    { time: '10:15', trafficGbps: 79.5, latencyMs: 28.5 },
    { time: '10:20', trafficGbps: 82.0, latencyMs: 28.2 },
    { time: '10:25', trafficGbps: 86.8, latencyMs: 28.6 },
    { time: '10:30', trafficGbps: 84.6, latencyMs: 28.4 }
  ]
};

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_hk_992147',
  telegramUsername: 'hikka_user',
  telegramId: '782194812',
  joinedDate: '15 января 2026',
  subscription: {
    status: 'active',
    planName: 'VIP Ultra 12M',
    expiresAt: '2027-01-15',
    daysRemaining: 322,
    maxDevices: 10,
    activeDevicesCount: 3,
    trafficLimitGb: 'unlimited',
    trafficUsedGb: 68.4,
    autoRenew: true,
    subscriptionKey: 'vless://9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d@ams01.hikkavpn.net:443?security=reality&sni=dl.google.com&fp=chrome&pbk=Z1Y2X3W4V5U6T7S8R9Q0P1O2N3M4L5K6J7I8H9G0F1E2D3C4B5A6&sid=1a2b3c4d&type=grpc&serviceName=hikkavpn-grpc#HikkaVPN-Amsterdam-Ultra'
  },
  devices: [
    {
      id: 'dev-1',
      name: 'iPhone 16 Pro Max',
      type: 'iphone',
      ip: '10.8.0.4',
      lastActive: 'Сейчас активен',
      trafficUsedGb: 32.8,
      location: 'Амстердам (NL)'
    },
    {
      id: 'dev-2',
      name: 'MacBook Pro M3 Max',
      type: 'macos',
      ip: '10.8.0.7',
      lastActive: '12 минут назад',
      trafficUsedGb: 28.1,
      location: 'Франкфурт (DE)'
    },
    {
      id: 'dev-3',
      name: 'Home Keenetic Giga Router',
      type: 'router',
      ip: '10.8.0.12',
      lastActive: 'Сейчас активен',
      trafficUsedGb: 7.5,
      location: 'Москва (RU Full Work)'
    }
  ]
};
