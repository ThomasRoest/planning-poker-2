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

test("can join session as second user", async ({ browser, page }) => {
  expect(password).toBeTruthy();

  const sessionTitle = `E2E Session ${Date.now()}`;
  const ownerName = `owner-${Date.now()}`;
  const participantName = `participant-${Date.now()}`;

  await page.goto("/");

  await page.locator('input[type="password"]').fill(password!);
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL(/\/create-session$/);
  await page.locator("#title").fill(sessionTitle);
  await page.locator("#username").fill(ownerName);
  await page.getByRole("button", { name: "Create session" }).click();

  await expect(page).toHaveURL(/\/session\/[0-9a-f-]{36}$/i);
  const sessionUrl = page.url();

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();

  try {
    await secondPage.goto(sessionUrl);

    await expect(secondPage.getByRole("heading", { name: sessionTitle })).toBeVisible();
    await secondPage.locator("#name").fill(participantName);
    await secondPage.getByRole("button", { name: "Join session" }).click();

    await expect(secondPage.getByText(ownerName).first()).toBeVisible();

  } finally {
    await secondContext.close();
  }
});

test("multi-user voting reveals average after both vote", async ({ browser, page }) => {
  expect(password).toBeTruthy();

  const sessionTitle = `E2E Session ${Date.now()}`;
  const ownerName = `owner-${Date.now()}`;
  const participantName = `participant-${Date.now()}`;

  await page.goto("/");

  await page.locator('input[type="password"]').fill(password!);
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL(/\/create-session$/);
  await page.locator("#title").fill(sessionTitle);
  await page.locator("#username").fill(ownerName);
  await page.getByRole("button", { name: "Create session" }).click();

  await expect(page).toHaveURL(/\/session\/[0-9a-f-]{36}$/i);
  const sessionUrl = page.url();

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();

  try {
    await secondPage.goto(sessionUrl);
    await expect(secondPage.getByRole("heading", { name: sessionTitle })).toBeVisible();
    await secondPage.locator("#name").fill(participantName);
    await secondPage.getByRole("button", { name: "Join session" }).click();

    await page.getByRole("button", { name: "3 points", exact: true }).click();
    await secondPage
      .getByRole("button", { name: "5 points", exact: true })
      .click();

    await expect(page.getByText("Average")).toBeVisible();
    await expect(page.getByText(/^4$/)).toBeVisible();
    await expect(secondPage.getByText("Average")).toBeVisible();
    await expect(secondPage.getByText(/^4$/)).toBeVisible();
  } finally {
    await secondContext.close();
  }
});

test("reset clears revealed session state", async ({ browser, page }) => {
  expect(password).toBeTruthy();

  const sessionTitle = `E2E Session ${Date.now()}`;
  const ownerName = `owner-${Date.now()}`;
  const participantName = `participant-${Date.now()}`;

  await page.goto("/");

  await page.locator('input[type="password"]').fill(password!);
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page).toHaveURL(/\/create-session$/);
  await page.locator("#title").fill(sessionTitle);
  await page.locator("#username").fill(ownerName);
  await page.getByRole("button", { name: "Create session" }).click();

  await expect(page).toHaveURL(/\/session\/[0-9a-f-]{36}$/i);
  const sessionUrl = page.url();

  const secondContext = await browser.newContext();
  const secondPage = await secondContext.newPage();

  try {
    await secondPage.goto(sessionUrl);
    await expect(secondPage.getByRole("heading", { name: sessionTitle })).toBeVisible();
    await secondPage.locator("#name").fill(participantName);
    await secondPage.getByRole("button", { name: "Join session" }).click();

    await page.getByRole("button", { name: "3 points", exact: true }).click();
    await secondPage.getByRole("button", { name: "5 points", exact: true }).click();

    await expect(page.getByText("Average")).toBeVisible();
    await expect(secondPage.getByText("Average")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Consensus!" })).toHaveCount(0);
    await expect(secondPage.getByRole("heading", { name: "Consensus!" })).toHaveCount(0);

    await page.getByRole("button", { name: "Reset" }).click();

    await expect(page.getByText("Average")).toHaveCount(0);
    await expect(secondPage.getByText("Average")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Consensus!" })).toHaveCount(0);
    await expect(secondPage.getByRole("heading", { name: "Consensus!" })).toHaveCount(0);

    await expect(page.getByRole("listitem")).toHaveCount(2);
    await expect(secondPage.getByRole("listitem")).toHaveCount(2);
  } finally {
    await secondContext.close();
  }
});
