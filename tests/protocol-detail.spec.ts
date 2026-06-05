import { test, expect } from '@playwright/test'

// --- Story 2.5: Protocol Detail Pages ---

// NOTE: The protocol detail page was rebuilt with class-based markup; only `breadcrumb`,
// `breadcrumb-home`, and `entity-attributes` carry data-testids. Assertions below target
// the current stable markup (hero title, badges, attribute rows, domain/affordance tags).

test('protocol detail page loads and displays protocol name (6.2)', async ({ page }) => {
  await page.goto('/prototype/protocols/ipfs')
  await expect(page.locator('h1.hero-title')).toContainText('IPFS')
})

test('all required attributes are visible (6.3)', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  // Entity type badge
  await expect(page.locator('.entity-badge')).toBeVisible()
  await expect(page.locator('.entity-badge')).toContainText('P2P Protocols')

  // Governance badge
  await expect(page.locator('.badge--governance')).toBeVisible()
  await expect(page.locator('.badge--governance')).toContainText('Community')

  // Capture risk badge
  await expect(page.locator('.badge--risk')).toBeVisible()
  await expect(page.locator('.badge--risk')).toContainText('Low capture risk')

  // Description
  await expect(page.locator('.hero-description')).toBeVisible()

  // Key attributes section (Details card)
  const attributes = page.locator('.attributes-card')
  await expect(attributes).toBeVisible()
  await expect(attributes).toContainText('License')
  await expect(attributes).toContainText('Last Investigated')

  // Domains section (use-case domain tags)
  await expect(page.locator('.tag--domain').first()).toBeVisible()

  // Affordances section
  await expect(page.locator('.tag--affordance').first()).toBeVisible()
})

test('JSON-LD TechArticle is present and valid (6.4)', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  const jsonLdScript = page.locator('script[type="application/ld+json"]')
  await expect(jsonLdScript).toBeAttached()

  const jsonLdText = await jsonLdScript.textContent()
  expect(jsonLdText).not.toBeNull()

  const jsonLd = JSON.parse(jsonLdText!)
  expect(jsonLd['@type']).toBe('TechArticle')
  expect(jsonLd.name).toBe('Nostr')
  expect(jsonLd.description).toBeTruthy()
  expect(jsonLd.url).toContain('/prototype/protocols/nostr')
  expect(jsonLd.author).toBeDefined()
  expect(jsonLd.publisher).toBeDefined()
})

test('page title contains protocol name (6.5)', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')
  await expect(page).toHaveTitle(/Nostr/)
  await expect(page).toHaveTitle(/OpenHaven/)
})

test('mobile viewport: no horizontal scroll, all content readable (6.6)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/prototype/protocols/nostr')

  await expect(page.locator('h1.hero-title')).toBeVisible()

  const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
  expect(scrollWidth).toBeLessThanOrEqual(375)
})

test('View Details link navigates to protocol page same-tab (6.7)', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  // The ProtocolCard "View details" footer link (testid renamed to protocol-link-{id})
  const detailLink = page.locator('[data-testid="protocol-link-nostr"]')
  await expect(detailLink).toBeVisible()
  await expect(detailLink).toHaveAttribute('href', '/prototype/protocols/nostr')
  // Should NOT have target="_blank" — same-tab navigation
  await expect(detailLink).not.toHaveAttribute('target', '_blank')
})

test('breadcrumb home link navigates back to the navigator (6.8)', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  const homeLink = page.locator('[data-testid="breadcrumb-home"]')
  await expect(homeLink).toBeVisible()
  await expect(homeLink).toHaveAttribute('href', '/prototype')

  await homeLink.click()
  await expect(page).toHaveURL('/prototype')
})

test('community link opens in new tab (6.9)', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  // External community link in the hero "Links" section
  const link = page.locator('a.link-btn[target="_blank"]')
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
})

test('breadcrumb renders with correct structure', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  const breadcrumb = page.locator('[data-testid="breadcrumb"]')
  await expect(breadcrumb).toBeVisible()
  await expect(breadcrumb).toContainText('Navigator')
  await expect(breadcrumb).toContainText('Tech Tools')
  await expect(breadcrumb).toContainText('Nostr')
})

test('domain pills link to domain landing pages', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  // Nostr has communication and identity-trust domains; tags link to the domain page
  const domainPill = page.locator('a.tag--domain[href$="/prototype/domains/communication"]')
  await expect(domainPill).toBeVisible()
  await expect(domainPill).toContainText('Communication')
})

test('affordance pills render for protocol', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  // Nostr has the e2e-encryption affordance (display name "End-to-end encrypted")
  const affordanceTags = page.locator('.tag--affordance')
  await expect(affordanceTags.first()).toBeVisible()
  await expect(affordanceTags.filter({ hasText: 'End-to-end encrypted' })).toBeVisible()
})

test('key attributes display optional fields when present', async ({ page }) => {
  await page.goto('/prototype/protocols/nostr')

  const attrs = page.locator('.attributes-card')

  // Nostr has: license, devStatus, owner, country, startYear, stack, funding, lastInvestigated
  await expect(attrs).toContainText('Public Domain') // license
  await expect(attrs).toContainText('Released') // devStatus
  await expect(attrs).toContainText('Brazil') // country
  await expect(attrs).toContainText('2020') // startYear
})

test('all protocol detail pages are generated (spot check)', async ({ page }) => {
  // Check a few different protocols load
  await page.goto('/prototype/protocols/ipfs')
  await expect(page.locator('h1.hero-title')).toContainText('IPFS')

  await page.goto('/prototype/protocols/matrix')
  await expect(page.locator('h1.hero-title')).toContainText('Matrix')

  await page.goto('/prototype/protocols/activitypub')
  await expect(page.locator('h1.hero-title')).toContainText('ActivityPub')
})

// --- Entity-Type-Specific Attributes ---

test('P2P protocol shows entity-specific attributes (IPFS)', async ({ page }) => {
  await page.goto('/prototype/protocols/ipfs')

  const section = page.locator('[data-testid="entity-attributes"]')
  await expect(section).toBeVisible()
  await expect(section).toContainText('P2P Protocol Attributes')
  await expect(section).toContainText('P2P Architecture')
  await expect(section).toContainText('Overlay Network')
  await expect(section).toContainText('Content Addressing')
})

test('D App shows different entity-specific attributes (AFFiNE)', async ({ page }) => {
  await page.goto('/prototype/protocols/affine')

  const section = page.locator('[data-testid="entity-attributes"]')
  await expect(section).toBeVisible()
  await expect(section).toContainText('Decentralized Application Attributes')
  await expect(section).toContainText('Use Case Category')
  await expect(section).toContainText('Offline Capabilities')

  // P2P-specific labels should NOT appear on a D App
  await expect(section).not.toContainText('P2P Architecture')
  await expect(section).not.toContainText('Overlay Network')
})
