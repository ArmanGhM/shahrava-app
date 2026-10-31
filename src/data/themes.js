/**
 * SHAHRAVA — Dynamic City Themes Configuration
 * Obsidian Luxury Design System with distinctive multi-layer digital personalities.
 */

export const CITY_THEMES = {
  rio: {
    id: "rio",
    nameFa: "ریو دو ژانیرو",
    nameEn: "Rio de Janeiro",
    primary: "#10B981", // Tropical Emerald
    primaryHover: "#059669",
    secondary: "#FBBF24", // Copacabana Golden Sand
    accent: "#EC4899", // Carnival Magenta
    background: "#050A07",
    backgroundSecondary: "#0A140F",
    surface: "#112018",
    surfaceElevated: "#182C22",
    surfaceHover: "#203B2D",
    surfaceOverlay: "rgba(17, 32, 24, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(16, 185, 129, 0.38)",
    glow: "rgba(16, 185, 129, 0.24)",
    glowAmbient: "rgba(251, 191, 36, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(5, 10, 7, 0.35) 0%, rgba(5, 10, 7, 0.75) 60%, #050A07 100%)",
    chartPalette: ["#10B981", "#FBBF24", "#EC4899", "#38BDF8", "#A855F7"],
    light: {
      background: "#ECFDF5",
      backgroundSecondary: "#D1FAE5",
      surface: "#FFFFFF",
      surfaceElevated: "#ECFDF5",
      surfaceHover: "#D1FAE5",
      border: "rgba(16, 185, 129, 0.25)",
      borderActive: "rgba(16, 185, 129, 0.5)",
      text: "#064E3B",
      textSecondary: "#374151",
      muted: "#4B5563",
    },
    patternType: "barcelona-trencadis",
    motifDescriptionFa:
      "موزاییک‌های رنگی کارناوال و خطوط ارگانیک کوه‌های ساحلی ریو",
    motifDescriptionEn:
      "Carnival mosaic vibrancy and organic coastal peak silhouettes",
  },
  tehran: {
    id: "tehran",
    nameFa: "تهران",
    nameEn: "Tehran",
    primary: "#16C6B1", // Persian Turquoise (فیروزه‌ای ایرانی درخشان)
    primaryHover: "#12A896",
    secondary: "#D6B66D", // Muted Alborz Gold (شن زرین البرز)
    accent: "#E07A5F", // Terracotta Warmth
    background: "#070C11", // Obsidian Base
    backgroundSecondary: "#0C131B", // Section Surface
    surface: "#121B24", // Card Surface
    surfaceElevated: "#182431", // Floating Surface
    surfaceHover: "#202F40", // Hover State
    surfaceOverlay: "rgba(18, 27, 36, 0.88)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(22, 198, 177, 0.35)",
    glow: "rgba(22, 198, 177, 0.22)",
    glowAmbient: "rgba(22, 198, 177, 0.08)",
    text: "#F5F7FA",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(7, 12, 17, 0.35) 0%, rgba(7, 12, 17, 0.75) 60%, #070C11 100%)",
    chartPalette: ["#16C6B1", "#D6B66D", "#E07A5F", "#38BDF8", "#10B981"],
    light: {
      background: "#F8FAFC",
      backgroundSecondary: "#F1F5F9",
      surface: "#FFFFFF",
      surfaceElevated: "#F8FAFC",
      surfaceHover: "#F1F5F9",
      border: "rgba(0, 0, 0, 0.08)",
      borderActive: "rgba(22, 198, 177, 0.45)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "persian-girih",
    motifDescriptionFa:
      "نقوش هندسی گره‌چینی ایرانی و شکوه قله‌های سپیدپوش البرز",
    motifDescriptionEn:
      "Persian Girih geometric stars and snow-capped Alborz ridgeline",
  },

  tokyo: {
    id: "tokyo",
    nameFa: "توکیو",
    nameEn: "Tokyo",
    primary: "#FF2A55", // Neon Tokyo Red (قرمز نئونی توکیو)
    primaryHover: "#E01E45",
    secondary: "#00E5FF", // Cyber Electric Cyan
    accent: "#A855F7", // Electric Violet
    background: "#07080E", // Shibuya Obsidian Base
    backgroundSecondary: "#0C0E18",
    surface: "#131626",
    surfaceElevated: "#1A1F35",
    surfaceHover: "#232946",
    surfaceOverlay: "rgba(19, 22, 38, 0.88)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(255, 42, 85, 0.38)",
    glow: "rgba(255, 42, 85, 0.25)",
    glowAmbient: "rgba(168, 85, 247, 0.10)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(7, 8, 14, 0.35) 0%, rgba(7, 8, 14, 0.75) 60%, #07080E 100%)",
    chartPalette: ["#FF2A55", "#00E5FF", "#A855F7", "#FBBF24", "#34D399"],
    light: {
      background: "#FFF1F2",
      backgroundSecondary: "#FFE4E6",
      surface: "#FFFFFF",
      surfaceElevated: "#FFF1F2",
      surfaceHover: "#FFE4E6",
      border: "rgba(255, 42, 85, 0.2)",
      borderActive: "rgba(255, 42, 85, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "tokyo-cyber-grid",
    motifDescriptionFa: "شبکه سایبرپانک نئونی و هندسه موج‌های سنتی آساهی",
    motifDescriptionEn: "Cyberpunk neon matrix & traditional Asahi wave motifs",
  },

  paris: {
    id: "paris",
    nameFa: "پاریس",
    nameEn: "Paris",
    primary: "#E5C07B", // Champagne Gold (طلای شامپاین اشرافی)
    primaryHover: "#D4AF37",
    secondary: "#58A6FF", // French Royal Azure
    accent: "#FF5C8A", // Parisian Rouge
    background: "#07090F", // Seine Midnight Obsidian
    backgroundSecondary: "#0C101A",
    surface: "#131826",
    surfaceElevated: "#1A2236",
    surfaceHover: "#222B44",
    surfaceOverlay: "rgba(19, 24, 38, 0.88)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(229, 192, 123, 0.38)",
    glow: "rgba(229, 192, 123, 0.22)",
    glowAmbient: "rgba(88, 166, 255, 0.08)",
    text: "#FDFBF7",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(7, 9, 15, 0.35) 0%, rgba(7, 9, 15, 0.75) 60%, #07090F 100%)",
    chartPalette: ["#E5C07B", "#58A6FF", "#FF5C8A", "#A78BFA", "#34D399"],
    light: {
      background: "#FDFBF7",
      backgroundSecondary: "#F7F4EB",
      surface: "#FFFFFF",
      surfaceElevated: "#FDFBF7",
      surfaceHover: "#F7F4EB",
      border: "rgba(229, 192, 123, 0.25)",
      borderActive: "rgba(229, 192, 123, 0.5)",
      text: "#111827",
      textSecondary: "#4B5563",
      muted: "#6B7280",
    },
    patternType: "paris-haussmann",
    motifDescriptionFa: "طاق‌های هوسمان و ظرافت‌های برنزی عصر بل‌اپوک",
    motifDescriptionEn:
      "Haussmannian wrought-iron arches & Belle Époque filigree",
  },

  dubai: {
    id: "dubai",
    nameFa: "دبی",
    nameEn: "Dubai",
    primary: "#E6B042", // Desert Luster Gold (طلای درخشان کویر)
    primaryHover: "#D49C2B",
    secondary: "#38BDF8", // Arabian Gulf Cerulean
    accent: "#F97316", // Sunset Amber
    background: "#060709", // Obsidian Onyx Base
    backgroundSecondary: "#0B0C10",
    surface: "#13141A",
    surfaceElevated: "#1A1B24",
    surfaceHover: "#232532",
    surfaceOverlay: "rgba(19, 20, 26, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(230, 176, 66, 0.38)",
    glow: "rgba(230, 176, 66, 0.24)",
    glowAmbient: "rgba(249, 115, 22, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A1A1AA",
    muted: "#71717A",
    heroGradient:
      "linear-gradient(180deg, rgba(6, 7, 9, 0.35) 0%, rgba(6, 7, 9, 0.75) 60%, #060709 100%)",
    chartPalette: ["#E6B042", "#38BDF8", "#F97316", "#A855F7", "#10B981"],
    light: {
      background: "#FFFBEB",
      backgroundSecondary: "#FEF3C7",
      surface: "#FFFFFF",
      surfaceElevated: "#FFFBEB",
      surfaceHover: "#FEF3C7",
      border: "rgba(230, 176, 66, 0.25)",
      borderActive: "rgba(230, 176, 66, 0.5)",
      text: "#18181B",
      textSecondary: "#52525B",
      muted: "#71717A",
    },
    patternType: "dubai-mashrabiya",
    motifDescriptionFa: "مشبک‌های پارامتریک مشربیه و خطوط صعودی آسمان‌خراش‌ها",
    motifDescriptionEn:
      "Parametric Mashrabiya lattice & soaring spire geometry",
  },

  istanbul: {
    id: "istanbul",
    nameFa: "استانبول",
    nameEn: "Istanbul",
    primary: "#0D9488", // Deep Bosphorus Teal (فیروزه‌ای عمیق بسفر)
    primaryHover: "#0F766E",
    secondary: "#D97706", // Ottoman Antique Gold (طلای عثمانی)
    accent: "#E11D48", // Bosphorus Tulip Red
    background: "#060B0E", // Bosphorus Obsidian
    backgroundSecondary: "#0B1218",
    surface: "#111C24",
    surfaceElevated: "#172632",
    surfaceHover: "#203444",
    surfaceOverlay: "rgba(17, 28, 36, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(13, 148, 136, 0.38)",
    glow: "rgba(13, 148, 136, 0.22)",
    glowAmbient: "rgba(217, 119, 6, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(6, 11, 14, 0.35) 0%, rgba(6, 11, 14, 0.75) 60%, #060B0E 100%)",
    chartPalette: ["#0D9488", "#D97706", "#E11D48", "#818CF8", "#34D399"],
    light: {
      background: "#F0FDFA",
      backgroundSecondary: "#CCFBF1",
      surface: "#FFFFFF",
      surfaceElevated: "#F0FDFA",
      surfaceHover: "#CCFBF1",
      border: "rgba(13, 148, 136, 0.25)",
      borderActive: "rgba(13, 148, 136, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "istanbul-iznik",
    motifDescriptionFa: "اسلیمی‌های کاشی‌کاری ایزنیک و امواج گذرگاه آبی بسفر",
    motifDescriptionEn:
      "Iznik tile arabesque curves and Bosphorus strait tides",
  },

  newyork: {
    id: "newyork",
    nameFa: "نیویورک",
    nameEn: "New York",
    primary: "#38BDF8", // Empire Electric Cobalt
    primaryHover: "#0284C7",
    secondary: "#FACC15", // Iconic Taxi Yellow
    accent: "#FB923C", // Sunset Hudson
    background: "#06090E", // Manhattan Obsidian
    backgroundSecondary: "#0B1018",
    surface: "#121A25",
    surfaceElevated: "#192434",
    surfaceHover: "#223045",
    surfaceOverlay: "rgba(18, 26, 37, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(56, 189, 248, 0.38)",
    glow: "rgba(56, 189, 248, 0.22)",
    glowAmbient: "rgba(250, 204, 21, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(6, 9, 14, 0.35) 0%, rgba(6, 9, 14, 0.75) 60%, #06090E 100%)",
    chartPalette: ["#38BDF8", "#FACC15", "#FB923C", "#E879F9", "#4ADE80"],
    light: {
      background: "#F0F9FF",
      backgroundSecondary: "#E0F2FE",
      surface: "#FFFFFF",
      surfaceElevated: "#F0F9FF",
      surfaceHover: "#E0F2FE",
      border: "rgba(56, 189, 248, 0.25)",
      borderActive: "rgba(56, 189, 248, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "newyork-artdeco",
    motifDescriptionFa: "هندسه آرت‌دکو برج‌های منهتن و شبکه منظم خیابان‌ها",
    motifDescriptionEn: "Art Deco Empire geometry & Manhattan street gridlines",
  },

  rome: {
    id: "rome",
    nameFa: "رم",
    nameEn: "Rome",
    primary: "#D9534F", // Imperial Terracotta & Crimson
    primaryHover: "#C9302C",
    secondary: "#EAB308", // Travertine Gold Marble
    accent: "#0284C7", // Mediterranean Azure
    background: "#0A0706", // Ancient Forum Obsidian
    backgroundSecondary: "#120E0C",
    surface: "#1C1613",
    surfaceElevated: "#261E1A",
    surfaceHover: "#332924",
    surfaceOverlay: "rgba(28, 22, 19, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(217, 83, 79, 0.38)",
    glow: "rgba(217, 83, 79, 0.22)",
    glowAmbient: "rgba(234, 179, 8, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(10, 7, 6, 0.35) 0%, rgba(10, 7, 6, 0.75) 60%, #0A0706 100%)",
    chartPalette: ["#D9534F", "#EAB308", "#0284C7", "#A855F7", "#22C55E"],
    light: {
      background: "#FFF7ED",
      backgroundSecondary: "#FFEDD5",
      surface: "#FFFFFF",
      surfaceElevated: "#FFF7ED",
      surfaceHover: "#FFEDD5",
      border: "rgba(217, 83, 79, 0.25)",
      borderActive: "rgba(217, 83, 79, 0.5)",
      text: "#1C1917",
      textSecondary: "#57534E",
      muted: "#78716C",
    },
    patternType: "rome-colosseum-arch",
    motifDescriptionFa:
      "طاق‌های سنگی کولوسئوم و نقوش مرمرین دوران کلاسیک امپراتوری",
    motifDescriptionEn:
      "Colosseum Roman arches & classical Travertine marble grooves",
  },

  barcelona: {
    id: "barcelona",
    nameFa: "بارسلونا",
    nameEn: "Barcelona",
    primary: "#0EA5E9", // Mediterranean Sky Blue
    primaryHover: "#0284C7",
    secondary: "#F59E0B", // Saffron Warmth
    accent: "#EC4899", // Gaudí Mosaic Cerise
    background: "#060A0F", // Mediterranean Obsidian
    backgroundSecondary: "#0B111A",
    surface: "#121C28",
    surfaceElevated: "#192738",
    surfaceHover: "#22344B",
    surfaceOverlay: "rgba(18, 28, 40, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(14, 165, 233, 0.38)",
    glow: "rgba(14, 165, 233, 0.22)",
    glowAmbient: "rgba(245, 158, 11, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(6, 10, 15, 0.35) 0%, rgba(6, 10, 15, 0.75) 60%, #060A0F 100%)",
    chartPalette: ["#0EA5E9", "#F59E0B", "#EC4899", "#8B5CF6", "#10B981"],
    light: {
      background: "#F0F9FF",
      backgroundSecondary: "#E0F2FE",
      surface: "#FFFFFF",
      surfaceElevated: "#F0F9FF",
      surfaceHover: "#E0F2FE",
      border: "rgba(14, 165, 233, 0.25)",
      borderActive: "rgba(14, 165, 233, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "barcelona-trencadis",
    motifDescriptionFa:
      "موزاییک‌های رنگین ترنکادیس و خطوط منحنی ارگانیک گائودی",
    motifDescriptionEn:
      "Gaudí Modernista organic curves and vibrant Trencadís mosaic",
  },

  london: {
    id: "london",
    nameFa: "لندن",
    nameEn: "London",
    primary: "#E11D48", // Royal Crimson Red
    primaryHover: "#BE123C",
    secondary: "#94A3B8", // Thames Silver Mist
    accent: "#38BDF8", // Westminster Azure
    background: "#07080C", // Foggy Thames Obsidian
    backgroundSecondary: "#0C0E15",
    surface: "#131622",
    surfaceElevated: "#1A1E2E",
    surfaceHover: "#23283E",
    surfaceOverlay: "rgba(19, 22, 34, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(225, 29, 72, 0.38)",
    glow: "rgba(225, 29, 72, 0.22)",
    glowAmbient: "rgba(56, 189, 248, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(7, 8, 12, 0.35) 0%, rgba(7, 8, 12, 0.75) 60%, #07080C 100%)",
    chartPalette: ["#E11D48", "#94A3B8", "#38BDF8", "#FBBF24", "#A855F7"],
    light: {
      background: "#FFF1F2",
      backgroundSecondary: "#FFE4E6",
      surface: "#FFFFFF",
      surfaceElevated: "#FFF1F2",
      surfaceHover: "#FFE4E6",
      border: "rgba(225, 29, 72, 0.25)",
      borderActive: "rgba(225, 29, 72, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "london-crown-grid",
    motifDescriptionFa: "شبکه نمادین متروی لندن و وقار ساعت بیگ‌بن",
    motifDescriptionEn:
      "Iconic Tube typographic grid and Big Ben neo-gothic lines",
  },

  isfahan: {
    id: "isfahan",
    nameFa: "اصفهان",
    nameEn: "Isfahan",
    primary: "#0284C7", // Safavid Royal Turquoise (فیروزه‌ای صفوی نقش‌جهان)
    primaryHover: "#0369A1",
    secondary: "#F59E0B", // Celestial Golden Dome
    accent: "#10B981", // Zayandeh Rood Emerald
    background: "#060C12", // Safavid Obsidian
    backgroundSecondary: "#0B141E",
    surface: "#111E2D",
    surfaceElevated: "#172A3E",
    surfaceHover: "#203853",
    surfaceOverlay: "rgba(17, 30, 45, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(2, 132, 199, 0.38)",
    glow: "rgba(2, 132, 199, 0.24)",
    glowAmbient: "rgba(245, 158, 11, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(6, 12, 18, 0.35) 0%, rgba(6, 12, 18, 0.75) 60%, #060C12 100%)",
    chartPalette: ["#0284C7", "#F59E0B", "#10B981", "#F43F5E", "#8B5CF6"],
    light: {
      background: "#F0F9FF",
      backgroundSecondary: "#E0F2FE",
      surface: "#FFFFFF",
      surfaceElevated: "#F0F9FF",
      surfaceHover: "#E0F2FE",
      border: "rgba(2, 132, 199, 0.25)",
      borderActive: "rgba(2, 132, 199, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "isfahan-arabesque",
    motifDescriptionFa:
      "طرح اسلیمی گنبد مسجد شیخ لطف‌الله و دهانه‌های پل خواجو",
    motifDescriptionEn:
      "Sheikh Lotfollah dome floral arabesque & Khaju bridge arches",
  },

  kyoto: {
    id: "kyoto",
    nameFa: "کیوتو",
    nameEn: "Kyoto",
    primary: "#10B981", // Matcha Emerald & Bamboo Sanctuary
    primaryHover: "#059669",
    secondary: "#F43F5E", // Torii Vermilion
    accent: "#D97706", // Ancient Cedar Wood
    background: "#050B08", // Zen Obsidian Sanctuary
    backgroundSecondary: "#0A130F",
    surface: "#101F18",
    surfaceElevated: "#162B21",
    surfaceHover: "#1E3A2D",
    surfaceOverlay: "rgba(16, 31, 24, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(16, 185, 129, 0.38)",
    glow: "rgba(16, 185, 129, 0.22)",
    glowAmbient: "rgba(244, 63, 94, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(5, 11, 8, 0.35) 0%, rgba(5, 11, 8, 0.75) 60%, #050B08 100%)",
    chartPalette: ["#10B981", "#F43F5E", "#D97706", "#8B5CF6", "#38BDF8"],
    light: {
      background: "#ECFDF5",
      backgroundSecondary: "#D1FAE5",
      surface: "#FFFFFF",
      surfaceElevated: "#ECFDF5",
      surfaceHover: "#D1FAE5",
      border: "rgba(16, 185, 129, 0.25)",
      borderActive: "rgba(16, 185, 129, 0.5)",
      text: "#064E3B",
      textSecondary: "#374151",
      muted: "#4B5563",
    },
    patternType: "kyoto-zen-bamboo",
    motifDescriptionFa: "آرامش شنی معابد ذن و دروازه‌های توری فوشیمی ایناری",
    motifDescriptionEn:
      "Zen raked-sand garden ripples and Fushimi Inari Torii gates",
  },

  cairo: {
    id: "cairo",
    nameFa: "قاهره",
    nameEn: "Cairo",
    primary: "#F59E0B", // Ancient Pharaonic Gold
    primaryHover: "#D97706",
    secondary: "#0284C7", // Nile Blue Lapis
    accent: "#EA580C", // Desert Sandstone
    background: "#090704", // Giza Obsidian Dusk
    backgroundSecondary: "#120F08",
    surface: "#1C170E",
    surfaceElevated: "#262014",
    surfaceHover: "#332B1C",
    surfaceOverlay: "rgba(28, 23, 14, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(245, 158, 11, 0.38)",
    glow: "rgba(245, 158, 11, 0.24)",
    glowAmbient: "rgba(2, 132, 199, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(9, 7, 4, 0.35) 0%, rgba(9, 7, 4, 0.75) 60%, #090704 100%)",
    chartPalette: ["#F59E0B", "#0284C7", "#EA580C", "#10B981", "#A855F7"],
    light: {
      background: "#FFFBEB",
      backgroundSecondary: "#FEF3C7",
      surface: "#FFFFFF",
      surfaceElevated: "#FFFBEB",
      surfaceHover: "#FEF3C7",
      border: "rgba(245, 158, 11, 0.25)",
      borderActive: "rgba(245, 158, 11, 0.5)",
      text: "#1C1917",
      textSecondary: "#57534E",
      muted: "#78716C",
    },
    patternType: "cairo-pyramid-lotus",
    motifDescriptionFa: "هندسه سه‌وجهی اهرام جیزه و نیلوفرهای آبی کرانه نیل",
    motifDescriptionEn:
      "Giza pyramid triangulation and Nile river water lotus motifs",
  },

  sydney: {
    id: "sydney",
    nameFa: "سیدنی",
    nameEn: "Sydney",
    primary: "#0284C7", // Pacific Ocean Azure
    primaryHover: "#0369A1",
    secondary: "#F59E0B", // Sunlit Bondi Sand
    accent: "#EC4899", // Coral Reef Pink
    background: "#060A10", // Harbour Obsidian
    backgroundSecondary: "#0A111B",
    surface: "#111B29",
    surfaceElevated: "#172538",
    surfaceHover: "#20334C",
    surfaceOverlay: "rgba(17, 27, 41, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: "rgba(2, 132, 199, 0.38)",
    glow: "rgba(2, 132, 199, 0.24)",
    glowAmbient: "rgba(245, 158, 11, 0.08)",
    text: "#FFFFFF",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient:
      "linear-gradient(180deg, rgba(6, 10, 16, 0.35) 0%, rgba(6, 10, 16, 0.75) 60%, #060A10 100%)",
    chartPalette: ["#0284C7", "#F59E0B", "#EC4899", "#10B981", "#8B5CF6"],
    light: {
      background: "#F0F9FF",
      backgroundSecondary: "#E0F2FE",
      surface: "#FFFFFF",
      surfaceElevated: "#F0F9FF",
      surfaceHover: "#E0F2FE",
      border: "rgba(2, 132, 199, 0.25)",
      borderActive: "rgba(2, 132, 199, 0.5)",
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "sydney-opera-shells",
    motifDescriptionFa: "پوسته‌های هندسی صدف‌گونه تالار اپرا و امواج بندرگاه",
    motifDescriptionEn:
      "Spherical geometry of Sydney Opera shells and harbour swell",
  },
};

/**
 * Returns the theme for a given theme id or city name.
 * Generates an automatic harmonious theme if the city is not in the presets!
 */
export function getCityTheme(cityIdentifier = "tehran") {
  const normalized = String(cityIdentifier)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");

  if (CITY_THEMES[normalized]) {
    return CITY_THEMES[normalized];
  }

  // Check nameFa / nameEn matching
  for (const key of Object.keys(CITY_THEMES)) {
    const t = CITY_THEMES[key];
    if (
      t.id === cityIdentifier ||
      t.nameEn.toLowerCase() === cityIdentifier.toLowerCase() ||
      t.nameFa === cityIdentifier
    ) {
      return t;
    }
  }

  // Deterministic harmonic color generator for any unlisted city
  let hash = 0;
  for (let i = 0; i < cityIdentifier.length; i++) {
    hash = cityIdentifier.charCodeAt(i) + ((hash << 5) - hash);
  }
  const huePrimary = Math.abs(hash) % 360;
  const hueSecondary = (huePrimary + 45) % 360;
  const hueAccent = (huePrimary + 180) % 360;

  return {
    id: `custom-${normalized}`,
    nameFa: cityIdentifier,
    nameEn: cityIdentifier,
    primary: `hsl(${huePrimary}, 80%, 50%)`,
    primaryHover: `hsl(${huePrimary}, 85%, 42%)`,
    secondary: `hsl(${hueSecondary}, 85%, 55%)`,
    accent: `hsl(${hueAccent}, 80%, 55%)`,
    background: "#070A0F",
    backgroundSecondary: "#0C1017",
    surface: "#131922",
    surfaceElevated: "#1A2330",
    surfaceHover: "#232E3F",
    surfaceOverlay: "rgba(19, 25, 34, 0.90)",
    border: "rgba(255, 255, 255, 0.08)",
    borderActive: `hsla(${huePrimary}, 80%, 50%, 0.4)`,
    glow: `hsla(${huePrimary}, 80%, 50%, 0.22)`,
    glowAmbient: `hsla(${hueSecondary}, 80%, 50%, 0.08)`,
    text: "#F5F7FA",
    textSecondary: "#A8B3BF",
    muted: "#718091",
    heroGradient: `linear-gradient(180deg, rgba(7, 10, 15, 0.35) 0%, rgba(7, 10, 15, 0.75) 60%, #070A0F 100%)`,
    chartPalette: [
      `hsl(${huePrimary}, 80%, 50%)`,
      `hsl(${hueSecondary}, 85%, 55%)`,
      `hsl(${hueAccent}, 80%, 55%)`,
      "#38BDF8",
      "#F59E0B",
    ],
    light: {
      background: "#F8FAFC",
      backgroundSecondary: "#F1F5F9",
      surface: "#FFFFFF",
      surfaceElevated: "#F8FAFC",
      surfaceHover: "#F1F5F9",
      border: "rgba(0, 0, 0, 0.08)",
      borderActive: `hsla(${huePrimary}, 80%, 50%, 0.4)`,
      text: "#0F172A",
      textSecondary: "#475569",
      muted: "#64748B",
    },
    patternType: "geometric-stellar",
    motifDescriptionFa:
      "هندسه هارمونیک و تم اختصاصی تولیدشده بر اساس مختصات شهر",
    motifDescriptionEn:
      "Harmonic algorithmic identity generated for this metropolis",
  };
}
