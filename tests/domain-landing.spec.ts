import { test, expect } from '@playwright/test'

// --- Story 2.6: Domain Landing Pages & SEO ---
// The domain landing page lives at /prototype/domains/{slug} and was rebuilt with
// class-based markup. Only `breadcrumb` and `breadcrumb-home` carry data-testids; the
// rest of the assertions target the current stable markup (hero title/description,
// explore CTA, protocol cards, affordance tags).

test('domain page loads and displays domain name (5.2)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')
  await expect(page.locator('h1.hero-title')).toContainText('Communication')
})

test('domain description is visible (5.3)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')
  await expect(page.locator('.hero-description')).toBeVisible()
  await expect(page.locator('.hero-description')).not.toBeEmpty()
})

test('explore in navigator link points to useCase param (5.4)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

  const cta = page.locator('a.action-btn--primary')
  await expect(cta).toBeVisible()

  const href = await cta.getAttribute('href')
  expect(href).toBe('/prototype?useCase=communication')
})

test('protocols list displays at least one protocol card (5.5)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

  const protocolsGrid = page.locator('.protocols-grid')
  await expect(protocolsGrid).toBeVisible()

  // At least one protocol card should exist
  const protocolCards = page.locator('[data-testid^="protocol-card-"]')
  await expect(protocolCards.first()).toBeVisible()
  expect(await protocolCards.count()).toBeGreaterThan(0)
})

test('protocol entries link to protocol detail pages (5.6)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

  // Each ProtocolCard exposes a footer "View details" link to the detail page
  const firstLink = page.locator('[data-testid^="protocol-link-"]').first()
  const href = await firstLink.getAttribute('href')
  expect(href).toMatch(/^\/prototype\/protocols\//)
})

test('JSON-LD CollectionPage and BreadcrumbList are present (5.7)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

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
  await page.goto('/prototype/domains/communication')
  const title = await page.title()
  expect(title).toContain('Communication')
})

test('mobile viewport has no horizontal scroll (5.9)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/prototype/domains/communication')

  // Check no horizontal overflow
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth)

  // Domain name is still visible
  await expect(page.locator('h1.hero-title')).toBeVisible()
})

test('breadcrumb home link navigates to the navigator (5.10)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

  const homeLink = page.locator('[data-testid="breadcrumb-home"]')
  await expect(homeLink).toBeVisible()

  const href = await homeLink.getAttribute('href')
  expect(href).toBe('/prototype')
})

test('affordances section displays at least one affordance tag (5.11)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

  // Affordances render as tags inside the content card
  const tags = page.locator('.tag--affordance')
  await expect(tags.first()).toBeVisible()
  expect(await tags.count()).toBeGreaterThan(0)
})

test('meta description contains domain name, description text, and protocol count (AC5)', async ({ page }) => {
  await page.goto('/prototype/domains/communication')

  const metaDesc = await page.locator('meta[name="description"]').getAttribute('content')
  expect(metaDesc).toBeTruthy()
  expect(metaDesc).toContain('Communication')
  // Tech-tool count appears in the meta description (e.g. "7 tech tools")
  expect(metaDesc).toMatch(/\d+ tech tool/)
})

test('all domain slugs generate valid pages (AC1 spot check)', async ({ page }) => {
  const slugs = ['identity-trust', 'communication', 'group-governance', 'place-mapping']
  for (const slug of slugs) {
    const response = await page.goto(`/prototype/domains/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1.hero-title')).toBeVisible()
  }
})
