import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { parse } from "csv-parse/sync";
import { format } from 'date-fns';


const id_text = parse(fs.readFileSync(path.join(__dirname, "data-test.csv")), {
  columns: true,
  skip_empty_lines: true,
});

test("saludo", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
});

test("Cliente fallece", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("link", { name: id_text[1].message }).click();
  await expect(page.getByRole("heading", { name: id_text[3].message })).toBeVisible();
  // Create a unique filename with a timestamp
  const timestamp = Date.now();
  const formattedDate = format(timestamp, 'yyyy-MM-dd_HH-mm-ss'); // Format the date using date-fns

  // Save the screenshot with the unique filename
  await page.screenshot({ path: `evidencias/saludo_test_${formattedDate}.png`, fullPage: true });
});
