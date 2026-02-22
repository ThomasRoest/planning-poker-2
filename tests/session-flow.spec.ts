import { expect, test } from "@playwright/test";
const password = process.env.VITE_PASSWORD;

test("can login and create a session", async ({ page }) => {
  expect(password).toBeTruthy();

  const sessionTitle = `E2E Session ${Date.now()}`;
  const username = `e2e-user-${Date.now()}`;

  await page.goto("/");

  await page.locator('input[type="password"]').fill(password!);
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL(/\/create-session$/);
  await expect(page.getByRole("heading", { name: "Create new session" })).toBeVisible();

  await page.locator("#title").fill(sessionTitle);
  await page.locator("#username").fill(username);
  await page.getByRole("button", { name: "Create session" }).click();

  await expect(page).toHaveURL(/\/session\/[0-9a-f-]{36}$/i);
  await expect(page.getByRole("heading", { name: sessionTitle })).toBeVisible();
  await expect(page.getByText(username).first()).toBeVisible();
});
