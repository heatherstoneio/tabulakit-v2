/**
 * TabulaKit Site Configuration
 *
 * Edit these values to customize your documentation site.
 * The /startup wizard will configure these for you automatically.
 */
window.TABULAKIT_CONFIG = {
  // Site identity
  name: "My Documentation",
  description: "A TabulaKit documentation site",
  logo: "",  // Path to logo image (optional, shown in sidebar)

  // Theme colors (CSS custom property overrides)
  theme: {
    color: "#3b82f6",           // Primary accent color
    sidebarWidth: "260px",
    baseFontSize: "15px"
  },

  // Docsify options (merged into window.$docsify)
  docsify: {
    subMaxLevel: 3,
    search: true
  }
};
