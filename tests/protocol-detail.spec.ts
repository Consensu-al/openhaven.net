import { test, expect } from '@playwright/test'

// --- Story 2.5: Protocol Detail Pages ---

test('protocol detail page loads and displays protocol name (6.2)', async ({ page }) => {
  await page.goto('/protocols/ipfs')
  await expect(page.locator('[data-testid="protocol-name"]')).toContainText('IPFS')
})

test('all required attributes are visible (6.3)', async ({ page }) => {
  await page.goto('/protocols/nostr')

  // Entity type
  await expect(page.locator('[data-testid="entity-type"]')).toBeVisible()
  await expect(page.locator('[data-testid="entity-type"]')).toContainText('P2P Protocols')

  // Architecture badge
  await expect(page.locator('[data-testid="architecture-badge"]')).toBeVisible()

  // Governance badge
  await expect(page.locator('[data-testid="governance-badge"]')).toBeVisible()
  await expect(page.locator('[data-testid="governance-badge"]')).toContainText('Community')

  // Capture risk
  await expect(page.locator('[data-testid="capture-risk"]')).toBeVisible()
  await expect(page.locator('[data-testid="capture-risk"]')).toContainText('Low capture risk')

  // Description
  await expect(page.locator('[data-testid="protocol-description"]')).toBeVisible()

  // Key attributes section
  await expect(page.locator('[data-testid="key-attributes"]')).toBeVisible()
  await expect(page.locator('[data-testid="key-attributes"]')).toContainText('License')
  await expect(page.locator('[data-testid="key-attributes"]')).toContainText('Last Investigated')

  // Domains section
  await expect(page.locator('[data-testid="domains-section"]')).toBeVisible()

  // Affordances section
  await expect(page.locator('[data-testid="affordances-section"]')).toBeVisible()
})

test('JSON-LD TechArticle is present and valid (6.4)', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const jsonLdScript = page.locator('script[type="application/ld+json"]')
  await expect(jsonLdScript).toBeAttached()

  const jsonLdText = await jsonLdScript.textContent()
  expect(jsonLdText).not.toBeNull()

  const jsonLd = JSON.parse(jsonLdText!)
  expect(jsonLd['@type']).toBe('TechArticle')
  expect(jsonLd.name).toBe('Nostr')
  expect(jsonLd.description).toBeTruthy()
  expect(jsonLd.url).toContain('/protocols/nostr')
  expect(jsonLd.author).toBeDefined()
  expect(jsonLd.publisher).toBeDefined()
})

test('page title contains protocol name (6.5)', async ({ page }) => {
  await page.goto('/protocols/nostr')
  await expect(page).toHaveTitle(/Nostr/)
  await expect(page).toHaveTitle(/OpenHaven/)
})

test('mobile viewport: no horizontal scroll, all content readable (6.6)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/protocols/nostr')

  await expect(page.locator('[data-testid="protocol-name"]')).toBeVisible()

  const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
  expect(scrollWidth).toBeLessThanOrEqual(375)
})

test('View Details link navigates to protocol page same-tab (6.7)', async ({ page }) => {
  await page.goto('/?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  const detailLink = page.locator('[data-testid="detail-link-nostr"]')
  await expect(detailLink).toBeVisible()
  await expect(detailLink).toHaveAttribute('href', '/protocols/nostr')
  // Should NOT have target="_blank" — same-tab navigation
  await expect(detailLink).not.toHaveAttribute('target', '_blank')
})

test('breadcrumb Home link navigates back to / (6.8)', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const homeLink = page.locator('[data-testid="breadcrumb-home"]')
  await expect(homeLink).toBeVisible()
  await expect(homeLink).toHaveAttribute('href', '/')

  await homeLink.click()
  await expect(page).toHaveURL('/')
})

test('community link opens in new tab (6.9)', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const link = page.locator('[data-testid="community-link"]')
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
})

test('breadcrumb renders with correct structure', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const breadcrumb = page.locator('[data-testid="breadcrumb"]')
  await expect(breadcrumb).toBeVisible()
  await expect(breadcrumb).toContainText('Home')
  await expect(breadcrumb).toContainText('Protocols')
  await expect(breadcrumb).toContainText('Nostr')
})

test('domain pills link to domain landing pages', async ({ page }) => {
  await page.goto('/protocols/nostr')

  // Nostr has communication and identity-trust domains
  const domainPill = page.locator('[data-testid="domain-pill-communication"]')
  await expect(domainPill).toBeVisible()

  const href = await domainPill.getAttribute('href')
  expect(href).toBe('/domains/communication')
})

test('affordance pills render for protocol', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const affordancesSection = page.locator('[data-testid="affordances-section"]')
  await expect(affordancesSection).toBeVisible()

  // Nostr has e2e-encryption affordance
  await expect(page.locator('[data-testid="affordance-pill-e2e-encryption"]')).toBeVisible()
})

test('back to navigator link is present', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const backLink = page.locator('[data-testid="back-to-navigator"]')
  await expect(backLink).toBeVisible()
  await expect(backLink).toHaveAttribute('href', '/#navigator')
})

test('key attributes display optional fields when present', async ({ page }) => {
  await page.goto('/protocols/nostr')

  const attrs = page.locator('[data-testid="key-attributes"]')

  // Nostr has: license, devStatus, owner, country, startYear, stack, funding, lastInvestigated
  await expect(attrs).toContainText('Public Domain') // license
  await expect(attrs).toContainText('Released') // devStatus
  await expect(attrs).toContainText('Brazil') // country
  await expect(attrs).toContainText('2020') // startYear
})

test('all protocol detail pages are generated (spot check)', async ({ page }) => {
  // Check a few different protocols load
  await page.goto('/protocols/ipfs')
  await expect(page.locator('[data-testid="protocol-name"]')).toContainText('IPFS')

  await page.goto('/protocols/matrix')
  await expect(page.locator('[data-testid="protocol-name"]')).toContainText('Matrix')

  await page.goto('/protocols/activitypub')
  await expect(page.locator('[data-testid="protocol-name"]')).toContainText('ActivityPub')
})

// --- Entity-Type-Specific Attributes ---

test('P2P protocol shows entity-specific attributes (IPFS)', async ({ page }) => {
  await page.goto('/protocols/ipfs')

  const section = page.locator('[data-testid="entity-attributes"]')
  await expect(section).toBeVisible()
  await expect(section).toContainText('P2P Protocol Attributes')
  await expect(section).toContainText('P2P Architecture')
  await expect(section).toContainText('Overlay Network')
  await expect(section).toContainText('Content Addressing')
})

test('D App shows different entity-specific attributes (AFFiNE)', async ({ page }) => {
  await page.goto('/protocols/affine')

  const section = page.locator('[data-testid="entity-attributes"]')
  await expect(section).toBeVisible()
  await expect(section).toContainText('Decentralized Application Attributes')
  await expect(section).toContainText('Use Case Category')
  await expect(section).toContainText('Offline Capabilities')

  // P2P-specific labels should NOT appear on a D App
  await expect(section).not.toContainText('P2P Architecture')
  await expect(section).not.toContainText('Overlay Network')
})
