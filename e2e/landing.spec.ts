import { expect, test } from "@playwright/test";

test("landing page communicates the event and exposes the waitlist", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /your people are the headliner/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /join the waitlist/i }).first()).toBeVisible();
  await expect(page.getByText(/december 2026/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /some photographs deserve a sequel/i })).toBeVisible();

  await page.getByRole("link", { name: /join the waitlist/i }).first().click();
  await expect(page.getByRole("textbox", { name: /first name/i })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});

test("keyboard focus reaches the waitlist fields", async ({ page }) => {
  await page.goto("/#waitlist");
  await page.getByRole("textbox", { name: /first name/i }).focus();
  await expect(page.getByRole("textbox", { name: /first name/i })).toBeFocused();
});

test("reduced-motion visitors retain all content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /one festival/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /who are you coming with/i })).toBeVisible();
});

test("capture review surfaces", async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Capture once from the desktop project");
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  await desktop.goto("/");
  for (const image of await desktop.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await desktop.locator("footer").scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(400);
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.screenshot({ path: ".impeccable/review/desktop.png", fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await mobile.goto("/");
  for (const image of await mobile.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await mobile.locator("footer").scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(400);
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.screenshot({ path: ".impeccable/review/mobile.png", fullPage: true });
});
