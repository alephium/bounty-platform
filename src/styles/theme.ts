export const lightTheme = {
    // Base colors
    background: "#FFFFFF",
    cardBackground: "#F8F9FA",
    cardBackgroundHover: "#F1F3F5",
    primary: "#986C1C",           // Lighter version of #C1A461
    primaryLight: "#C1A461",
    primaryLighter: "#E5D5A8",
    text: "#1B2228",
    textSecondary: "#4A5460",
    textMuted: "#6C757D",
    border: "#DEE2E6",
    borderLight: "#E9ECEF",
    
    // Gradients
    headerGradient: "from-amber-300 via-amber-400 to-amber-300",
    cardGradient: "from-amber-50 to-amber-100/50",
    
    // Button variants
    buttonPrimary: "bg-amber-500 hover:bg-amber-600 text-white",
    buttonOutline: "border-amber-200 text-amber-700 hover:bg-amber-50",
    buttonGhost: "text-amber-700 hover:bg-amber-50",
    
    // States
    success: "#2E7D32",
    error: "#D32F2F",
    warning: "#ED6C02",
    info: "#0288D1",
  }
  
  // Usage example for a component:
  // className={`bg-${lightTheme.background} text-${lightTheme.text}`}