import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';

const id_text = parse(fs.readFileSync(path.join(__dirname, 'data-test.csv')), {
  columns: true,
  skip_empty_lines: true
});


console.log(id_text[0].message); //muestra el mensaje del id_text 0. pero en realidad es el indice, fila 0
console.log(id_text[2].message);
console.log(id_text[3].message)


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  // Build the regular expression from id_text[3].message
  //const expectedTitleRegex = new RegExp(id_text[0].message);

  // Use the regular expression with toHaveTitle
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: (id_text[1].message) }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: (id_text[3].message) })).toBeVisible();
});