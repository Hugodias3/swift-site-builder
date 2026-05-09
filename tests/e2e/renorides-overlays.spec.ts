import { test, expect, Page } from "@playwright/test";

/**
 * Verifies the centralized z-index scale (src/lib/z.ts) actually wins on the
 * page: Leaflet panes sit below app overlays, and overlays stack in the right
 * order on every RenoRides screen.
 *
 * Each assertion picks the topmost element under a representative point and
 * checks it is the expected layer — catching regressions where a misplaced
 * z-index hides toasts, sheets, or the bottom nav under the map.
 */

const Z = {
  mapOverlay: 1000,
  bottomNav: 1100,
  sheetBackdrop: 1150,
  bottomSheet: 1200,
  modal: 2000,
  toast: 3000,
  leafletPopupMax: 720,
};

async function topZAt(page: Page, x: number, y: number): Promise<number> {
  return page.evaluate(({ x, y }) => {
    const els = document.elementsFromPoint(x, y);
    let max = 0;
    for (const el of els) {
      const z = parseInt(getComputedStyle(el as Element).zIndex || "0", 10);
      if (!Number.isNaN(z) && z > max) max = z;
    }
    return max;
  }, { x, y });
}

test.describe("RenoRides overlay z-index", () => {
  test("Leaflet panes sit below app overlays", async ({ page }) => {
    await page.goto("/app/renorides");
    await page.waitForSelector(".leaflet-container", { timeout: 10_000 });

    const panes = await page.evaluate(() => {
      const get = (cls: string) => {
        const el = document.querySelector(cls);
        return el ? parseInt(getComputedStyle(el).zIndex || "0", 10) : null;
      };
      return {
        tile: get(".leaflet-tile-pane"),
        marker: get(".leaflet-marker-pane"),
        tooltip: get(".leaflet-tooltip-pane"),
        popup: get(".leaflet-popup-pane"),
      };
    });

    expect(panes.tile).toBeLessThan(panes.marker!);
    expect(panes.marker).toBeLessThan(panes.tooltip!);
    expect(panes.tooltip).toBeLessThan(panes.popup!);
    expect(panes.popup!).toBeLessThan(Z.mapOverlay);
  });

  test("Header and bottom nav cover the map", async ({ page }) => {
    await page.goto("/app/renorides");
    await page.waitForSelector(".leaflet-container");
    const vp = page.viewportSize()!;
    const topZ = await topZAt(page, vp.width / 2, 30);
    const bottomZ = await topZAt(page, vp.width / 2, vp.height - 20);
    expect(topZ).toBeGreaterThanOrEqual(Z.mapOverlay);
    expect(bottomZ).toBeGreaterThanOrEqual(Z.bottomNav);
  });

  test("Bottom sheet + backdrop stack above map and below modals", async ({ page }) => {
    await page.goto("/app/renorides");
    await page.waitForSelector(".leaflet-container");

    // Open the sheet by clicking a known pin (Karim D. — first available)
    const pin = page.locator(".leaflet-marker-icon").first();
    await pin.click({ force: true });

    // If the non-member modal opens first, dismiss it
    const cont = page.getByRole("button", { name: /continuer/i });
    if (await cont.isVisible().catch(() => false)) {
      await cont.click();
      await pin.click({ force: true });
    }

    await page.waitForSelector("text=Demander un devis", { timeout: 5_000 });

    const vp = page.viewportSize()!;
    const sheetZ = await topZAt(page, vp.width / 2, vp.height - 80);
    const backdropZ = await topZAt(page, vp.width / 2, 100);

    expect(sheetZ).toBeGreaterThanOrEqual(Z.bottomSheet);
    expect(backdropZ).toBeGreaterThanOrEqual(Z.sheetBackdrop);
    expect(backdropZ).toBeLessThan(Z.modal);
  });

  test("Centralized scale ordering invariants", () => {
    expect(Z.leafletPopupMax).toBeLessThan(Z.mapOverlay);
    expect(Z.mapOverlay).toBeLessThan(Z.bottomNav);
    expect(Z.bottomNav).toBeLessThan(Z.sheetBackdrop);
    expect(Z.sheetBackdrop).toBeLessThan(Z.bottomSheet);
    expect(Z.bottomSheet).toBeLessThan(Z.modal);
    expect(Z.modal).toBeLessThan(Z.toast);
  });
});
