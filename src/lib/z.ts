/**
 * Centralized z-index scale for RenoRides + global overlays.
 *
 * Leaflet panes (built-in):
 *   tilePane 200 · overlayPane 400 · shadowPane 500
 *   markerPane 600 · tooltipPane 650 · popupPane 700
 *
 * All app overlays MUST sit above 700.
 * Use either Z.xxx (numeric, inline style) or zClass.xxx (Tailwind arbitrary class).
 */
export const Z = {
  // Leaflet (overrides applied via CSS in styles.css to guarantee ordering)
  leafletTile: 200,
  leafletOverlay: 400,
  leafletShadow: 500,
  leafletMarker: 600,
  leafletTooltip: 680,
  leafletPopup: 720,

  // App layers above the map
  mapOverlay: 1000,   // header, filters, footer banner over the map
  mapFab: 1010,       // floating action buttons
  bottomNav: 1100,    // global bottom navigation
  sheetBackdrop: 1150,
  bottomSheet: 1200,
  menuOverlay: 1300,  // side/menu drawer over the map
  modal: 2000,        // dialogs, NonMemberModal
  toast: 3000,        // notifications, sonner
} as const;

export const zClass = {
  mapOverlay: "z-[1000]",
  mapFab: "z-[1010]",
  bottomNav: "z-[1100]",
  sheetBackdrop: "z-[1150]",
  bottomSheet: "z-[1200]",
  menuOverlay: "z-[1300]",
  modal: "z-[2000]",
  toast: "z-[3000]",
} as const;
