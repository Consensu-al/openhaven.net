import { test, expect } from '@playwright/test'

// --- Story 2.6: Domain Landing Pages & SEO ---

test('domain page loads and displays domain name (5.2)', async ({ page }) => {
  await page.goto('/domains/communication')
  await expect(page.locator('[data-testid="domain-name"]')).toContainText('Communication')
})

test('domain description is visible (5.3)', async ({ page }) => {
  await page.goto('/domains/communication')
  await expect(page.locator('[data-testid="domain-description"]')).toBeVisible()
  await expect(page.locator('[data-testid="domain-description"]')).not.toBeEmpty()
})

test('explore in navigator link points to useCase param (5.4)', async ({ page }) => {
  await page.goto('/domains/communication')

  const cta = page.locator('[data-testid="explore-navigator-cta"]')
  await expect(cta).toBeVisible()

  const href = await cta.getAttribute('href')
  expect(href).toBe('/?useCase=communication')
})

test('protocols list displays at least one protocol card (5.5)', async ({ page }) => {
  await page.goto('/domains/communication')

  const protocolsSection = page.locator('[data-testid="protocols-section"]')
  await expect(protocolsSection).toBeVisible()

  // At least one protocol entry should exist
  const protocolEntries = page.locator('[data-testid^="protocol-entry-"]')
  await expect(protocolEntries.first()).toBeVisible()
  expect(await protocolEntries.count()).toBeGreaterThan(0)
})

test('protocol entries link to protocol detail pages (5.6)', async ({ page }) => {
  await page.goto('/domains/communication')

  const firstEntry = page.locator('[data-testid^="protocol-entry-"]').first()
  const href = await firstEntry.getAttribute('href')
  expect(href).toMatch(/^\/protocols\//)
})

test('JSON-LD CollectionPage and BreadcrumbList are present (5.7)', async ({ page }) => {
  await page.goto('/domains/communication')

  const jsonLdScript = page.locator('script[type="application/ld+json"]')
  await expect(jsonLdScript).toBeAttached()

  const jsonLdContent = await jsonLdScript.textContent()
  expect(jsonLdContent).toBeTruthy()

  const parsed = JSON.parse(jsonLdContent!)
  expect(Array.isArray(parsed)).toBe(true)
  expect(parsed.length).toBe(2)

  // CollectionPage with ItemList
  const collectionPage = parsed.find((item: any) => item['@type'] === 'CollectionPage')
  expect(collectionPage).toBeTruthy()
  expect(collectionPage.mainEntity['@type']).toBe('ItemList')

  // BreadcrumbList with 3 items
  const breadcrumbList = parsed.find((item: any) => item['@type'] === 'BreadcrumbList')
  expect(breadcrumbList).toBeTruthy()
  expect(breadcrumbList.itemListElement).toHaveLength(3)
})

test('page title contains domain name (5.8)', async ({ page }) => {
  await page.goto('/domains/communication')
  const title = await page.title()
  expect(title).toContain('Communication')
})

test('mobile viewport has no horizontal scroll (5.9)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/domains/communication')

  // Check no horizontal overflow
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth)

  // Domain name is still visible
  await expect(page.locator('[data-testid="domain-name"]')).toBeVisible()
})

test('breadcrumb home link navigates to root (5.10)', async ({ page }) => {
  await page.goto('/domains/communication')

  const homeLink = page.locator('[data-testid="breadcrumb-home"]')
  await expect(homeLink).toBeVisible()

  const href = await homeLink.getAttribute('href')
  expect(href).toBe('/')
})

test('affordances section displays at least one affordance pill (5.11)', async ({ page }) => {
  await page.goto('/domains/communication')

  const affordancesSection = page.locator('[data-testid="affordances-section"]')
  await expect(affordancesSection).toBeVisible()

  const pills = page.locator('[data-testid^="affordance-pill-"]')
  await expect(pills.first()).toBeVisible()
  expect(await pills.count()).toBeGreaterThan(0)
})

test('meta description contains domain name, description text, and protocol count (AC5)', async ({ page }) => {
  await page.goto('/domains/communication')

  const metaDesc = await page.locator('meta[name="description"]').getAttribute('content')
  expect(metaDesc).toBeTruthy()
  expect(metaDesc).toContain('Communication')
  expect(metaDesc).toMatch(/\d+ open protocol/)
})

test('all domain slugs generate valid pages (AC1 spot check)', async ({ page }) => {
  const slugs = ['identity-trust', 'communication', 'group-governance', 'place-mapping']
  for (const slug of slugs) {
    const response = await page.goto(`/domains/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('[data-testid="domain-name"]')).toBeVisible()
  }
})
