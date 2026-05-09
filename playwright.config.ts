import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for RenoRides overlay/z-index tests.
 *
 * Run locally:
 *   npx playwright install chromium    # one-time, downloads the browser
 *   npm run dev                        # in another terminal
 *   npx playwright test                # run the suite
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
