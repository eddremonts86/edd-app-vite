import { expect, test } from '@playwright/test'

test('language switcher toggles to Spanish', async ({ page }) => {
  await page.goto('/')
  const cta = page.getByRole('button', { name: /open dashboard/i })
  await expect(cta).toBeVisible()

  await page.getByRole('button', { name: /switch to es/i }).click()
  await expect(page.getByRole('button', { name: /abrir dashboard/i })).toBeVisible()
})
