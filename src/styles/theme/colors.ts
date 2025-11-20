export const colors = {
  // === BRAND (Identidade principal) ===
  brand: {
    primary: "#0A3D62",   // Azul escuro principal
    secondary: "#1E5A8A", // Azul médio
    accent: "#2D7BB5",    // Azul claro
  },

  // === TEXT COLORS ===
  text: {
    title: "#FFFFFF",     // Branco (para fundos escuros)
    subtitle: "#E5E7EB",  // Cinza claro
    body: "#D1D5DB",      // Texto secundário
    muted: "#9CA3AF",     // Texto desativado
    inverse: "#0A3D62",   // Para usar sobre fundos brancos
  },

  // === BACKGROUNDS ===
  background: {
    primary: "#0A3D62",   // Fundo principal (hero section)
    secondary: "#1E5A8A", // Fundo intermediário
    accent: "#2D7BB5",    // Fundo de destaque
    light: "#FFFFFF",     // Fundo claro
    overlay: "rgba(255, 255, 255, 0.10)", // Vidro fosco (fundo translúcido)
  },

  // === BUTTONS ===
  button: {
    primary: {
      bg: "#f97316",     // Laranja (gradiente principal)
      hover: "#ea580c",
      text: "#FFFFFF",
    },
    secondary: {
      bg: "transparent",
      border: "rgba(255, 255, 255, 0.30)",
      text: "#FFFFFF",
      hoverBg: "#FFFFFF",
      hoverText: "#0A3D62",
    },
  },

  // === GRADIENTS ===
  gradient: {
    orange: {
      from: "#f97316",
      to: "#ea580c",
    },
    blue: {
      from: "#3b82f6",
      to: "#2563eb",
    },
    brand: {
      from: "#0A3D62",
      via: "#1E5A8A",
      to: "#2D7BB5",
    },
  },

  // === BORDERS E DIVIDERS ===
  border: {
    subtle: "rgba(255, 255, 255, 0.20)",
    strong: "rgba(255, 255, 255, 0.30)",
    highlight: "rgba(249, 115, 22, 0.50)", // hover orange
  },

  // === FEEDBACK COLORS (alertas, status, etc.) ===
  state: {
    success: "#22c55e",
    warning: "#eab308",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // === DECORATIVE / TRANSLUCENT ELEMENTS ===
  glow: {
    orange: "rgba(249, 115, 22, 0.20)",
    blue: "rgba(59, 130, 246, 0.20)",
  },
};
