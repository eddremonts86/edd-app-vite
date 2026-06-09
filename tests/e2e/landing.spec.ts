import { expect, test } from '@playwright/test'

test('landing page renders the hero CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: /open dashboard/i })).toBeVisible()
})
