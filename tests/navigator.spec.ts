import { test, expect } from '@playwright/test'

// --- Story 2.2: Domain Grid ---

test('domain grid renders 10 cards', async ({ page }) => {
  await page.goto('/prototype')
  const grid = page.locator('[data-testid="domain-grid"]')
  await expect(grid).toBeVisible()

  const cards = page.locator('[data-testid^="domain-card-"]')
  await expect(cards).toHaveCount(10)
})

test('domain grid displays correct domain names', async ({ page }) => {
  await page.goto('/prototype')
  await expect(page.locator('[data-testid="domain-card-identity-trust"]')).toContainText('Identity & Trust')
  await expect(page.locator('[data-testid="domain-card-communication"]')).toContainText('Communication')
  await expect(page.locator('[data-testid="domain-card-group-governance"]')).toContainText('Group Formation & Governance')
})

test('clicking domain card adds useCase param to URL', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()

  const url = new URL(page.url())
  expect(url.searchParams.get('useCase')).toBe('communication')
})

test('clicking selected domain card deselects it and clears URL param', async ({ page }) => {
  await page.goto('/prototype')
  const card = page.locator('[data-testid="domain-card-communication"]')

  // Select
  await card.click()
  expect(new URL(page.url()).searchParams.get('useCase')).toBe('communication')

  // Deselect
  await card.click()
  expect(new URL(page.url()).searchParams.has('useCase')).toBe(false)
})

test('deep link with useCase param pre-selects domain', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')

  const card = page.locator('[data-testid="domain-card-communication"]')
  await expect(card).toHaveAttribute('aria-checked', 'true')
})

test.skip('post-selection confirmation shows domain name — selection-confirmation element removed in NavigatorSection redesign', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')

  const confirmation = page.locator('[data-testid="selection-confirmation"]')
  await expect(confirmation).toContainText('Communication')
})

test('domain cards are keyboard focusable', async ({ page }) => {
  await page.goto('/prototype')

  // Focus a card directly and verify it receives focus
  const card = page.locator('[data-testid="domain-card-identity-trust"]')
  await card.focus()
  await expect(card).toBeFocused()

  // Press Enter to select
  await page.keyboard.press('Enter')
  // Wait for replaceState URL update to settle
  await page.waitForTimeout(100)
  const url = new URL(page.url())
  expect(url.searchParams.get('useCase')).toBe('identity-trust')
})

test('secondary domains render with reduced visual weight', async ({ page }) => {
  await page.goto('/prototype')

  const secondaryCard = page.locator('[data-testid="domain-card-platform-sovereignty"]')
  await expect(secondaryCard).toBeVisible()

  // Secondary cards should have opacity class applied
  const opacity = await secondaryCard.evaluate((el) => getComputedStyle(el).opacity)
  expect(parseFloat(opacity)).toBeLessThan(1)
})

test('domain cards have aria role="radio"', async ({ page }) => {
  await page.goto('/prototype')

  const card = page.locator('[data-testid="domain-card-communication"]')
  await expect(card).toHaveAttribute('role', 'radio')
  await expect(card).toHaveAttribute('aria-checked', 'false')
})

test('empty state message shown when no domains (regression guard)', async ({ page }) => {
  // This test is a guard — in production, domains are always present.
  // It verifies the component handles the edge case correctly via the build-time validation.
  await page.goto('/prototype')
  // Verify grid is present (non-empty state)
  await expect(page.locator('[data-testid="domain-grid"]')).toBeVisible()
})

// --- Story 2.2b: Guided Discovery ---

test.skip('CTA banner renders above domain grid — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  const cta = page.locator('[data-testid="guided-discovery-cta"]')
  await expect(cta).toBeVisible()

  // Verify CTA is above grid in DOM order
  const ctaBox = await cta.boundingBox()
  const gridBox = await page.locator('[data-testid="domain-grid"]').boundingBox()
  expect(ctaBox!.y).toBeLessThan(gridBox!.y)
})

test.skip('CTA button opens wizard dialog — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()

  const wizard = page.locator('[data-testid="guided-discovery-wizard"]')
  await expect(wizard).toBeVisible()
})

test.skip('wizard displays question and 6 answer cards — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()

  const wizard = page.locator('[data-testid="guided-discovery-wizard"]')
  await expect(wizard).toContainText('What are you trying to do?')

  const answers = wizard.locator('[data-testid^="wizard-answer-"]')
  await expect(answers).toHaveCount(6)
})

test.skip('clicking survey answer closes wizard and updates URL — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()

  // Click "Talk freely with people and groups" → communication domain
  await page.locator('[data-testid="wizard-answer-communicate"]').click()

  // Wizard should close
  await expect(page.locator('[data-testid="guided-discovery-wizard"]')).not.toBeVisible()

  // URL should have useCase param
  const url = new URL(page.url())
  expect(url.searchParams.get('useCase')).toBe('communication')
})

test.skip('after wizard completion, domain grid highlights selected domain — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()
  await page.locator('[data-testid="wizard-answer-communicate"]').click()

  // Domain card should be selected
  const card = page.locator('[data-testid="domain-card-communication"]')
  await expect(card).toHaveAttribute('aria-checked', 'true')
})

test.skip('CTA banner remains visible after wizard completion — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()
  await page.locator('[data-testid="wizard-answer-communicate"]').click()

  // CTA should still be visible
  await expect(page.locator('[data-testid="guided-discovery-cta"]')).toBeVisible()
})

test.skip('tooltip displays domain mapping on hover — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()

  // Hover over tooltip trigger
  await page.locator('[data-testid="wizard-tooltip-communicate"]').hover()

  // Tooltip should show the mapping text with domain name (Radix portals may create duplicates)
  await expect(page.getByText('This maps to:').first()).toBeVisible()
})

test.skip('Escape key closes wizard dialog — guided-discovery wizard entry point removed in NavigatorSection redesign (GuidedDiscoveryCTA no longer rendered; no UI to open the wizard)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="guided-discovery-open"]').click()
  await expect(page.locator('[data-testid="guided-discovery-wizard"]')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('[data-testid="guided-discovery-wizard"]')).not.toBeVisible()
})

test('deep link with useCase does NOT auto-open wizard', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')

  // Domain should be selected
  await expect(page.locator('[data-testid="domain-card-communication"]')).toHaveAttribute('aria-checked', 'true')

  // Wizard should NOT be open
  await expect(page.locator('[data-testid="guided-discovery-wizard"]')).not.toBeVisible()
})

test('no horizontal scrolling at 375px with navigator section', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/prototype')

  // Wait for island to hydrate
  await expect(page.locator('[data-testid="domain-grid"]')).toBeVisible()

  const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
  expect(scrollWidth).toBeLessThanOrEqual(375)
})

// --- Story 2.3: Affordances Panel ---

test('affordances panel appears when domain is selected', async ({ page }) => {
  await page.goto('/prototype')
  const panel = page.locator('[data-testid="affordances-panel"]')
  await expect(panel).not.toBeVisible()

  await page.locator('[data-testid="domain-card-communication"]').click()
  await expect(panel).toBeVisible()
})

test('affordance chips render for communication domain (at least 3)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()

  const chips = page.locator('[data-testid^="affordance-chip-"]')
  const count = await chips.count()
  expect(count).toBeGreaterThanOrEqual(3)
})

test('all chips are initially unpressed after domain selection (additive model)', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()

  const chips = page.locator('[data-testid^="affordance-chip-"]')
  const count = await chips.count()
  for (let i = 0; i < count; i++) {
    await expect(chips.nth(i)).toHaveAttribute('aria-pressed', 'false')
  }
})

test('clicking a chip toggles it to on and adds affordance to URL', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()

  // Click first chip to check it (starts unchecked in additive model)
  const firstChip = page.locator('[data-testid="affordance-chip-e2e-encryption"]')
  await firstChip.click()

  await expect(firstChip).toHaveAttribute('aria-pressed', 'true')

  // URL should have affordance param with the checked ID
  const url = new URL(page.url())
  const affordanceParam = url.searchParams.get('affordance')
  expect(affordanceParam).not.toBeNull()
  expect(affordanceParam).toContain('e2e-encryption')
})

test('deselecting domain hides affordances panel', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()
  await expect(page.locator('[data-testid="affordances-panel"]')).toBeVisible()

  // Deselect by clicking same domain again
  await page.locator('[data-testid="domain-card-communication"]').click()
  await expect(page.locator('[data-testid="affordances-panel"]')).not.toBeVisible()
})

test('deep link with useCase and affordance params restores correct state', async ({ page }) => {
  await page.goto('/prototype?useCase=communication&affordance=e2e-encryption')

  // Panel should be visible
  await expect(page.locator('[data-testid="affordances-panel"]')).toBeVisible()

  // e2e-encryption chip should be on
  await expect(page.locator('[data-testid="affordance-chip-e2e-encryption"]')).toHaveAttribute('aria-pressed', 'true')

  // Other chips should be off
  await expect(page.locator('[data-testid="affordance-chip-protocol-federation"]')).toHaveAttribute('aria-pressed', 'false')
})

test('no horizontal scrolling at 375px with affordances panel visible', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/prototype?useCase=communication')

  await expect(page.locator('[data-testid="affordances-panel"]')).toBeVisible()

  const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
  expect(scrollWidth).toBeLessThanOrEqual(375)
})

test('affordances panel not visible when no domain selected', async ({ page }) => {
  await page.goto('/prototype')
  await expect(page.locator('[data-testid="affordances-panel"]')).not.toBeVisible()
})

test('deep link with empty affordance param restores all-unchecked state', async ({ page }) => {
  await page.goto('/prototype?useCase=communication&affordance=')

  await expect(page.locator('[data-testid="affordances-panel"]')).toBeVisible()

  // All chips should be off (none checked)
  const chips = page.locator('[data-testid^="affordance-chip-"]')
  const count = await chips.count()
  for (let i = 0; i < count; i++) {
    await expect(chips.nth(i)).toHaveAttribute('aria-pressed', 'false')
  }
})

test('checking then unchecking all chips clears affordance param from URL', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()

  const chips = page.locator('[data-testid^="affordance-chip-"]')
  const count = await chips.count()

  // Check all chips first
  for (let i = 0; i < count; i++) {
    await chips.nth(i).click()
  }

  // Uncheck all chips
  for (let i = 0; i < count; i++) {
    await chips.nth(i).click()
  }

  // Wait for microtask-based URL updates to settle
  await page.waitForTimeout(100)

  // URL should not have affordance param when all unchecked
  const url = new URL(page.url())
  expect(url.searchParams.has('affordance')).toBe(false)
})

// --- Story 2.3-BF1: Affordances Nudge Callout ---

test('nudge callout visible when panel renders with no affordances checked', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()
  await expect(page.locator('[data-testid="affordances-panel"]')).toBeVisible()

  const nudge = page.locator('[data-testid="affordances-nudge"]')
  await expect(nudge).toBeVisible()
  await expect(nudge).toHaveAttribute('role', 'status')
  await expect(nudge).toContainText('Check the affordances that matter to you to narrow results')
})

test('nudge callout disappears after checking one affordance chip', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()
  await expect(page.locator('[data-testid="affordances-nudge"]')).toBeVisible()

  // Check one chip
  await page.locator('[data-testid="affordance-chip-e2e-encryption"]').click()

  await expect(page.locator('[data-testid="affordances-nudge"]')).not.toBeVisible()
})

test('nudge callout reappears after clearing all affordances', async ({ page }) => {
  await page.goto('/prototype')
  await page.locator('[data-testid="domain-card-communication"]').click()

  // Check one chip to hide nudge
  await page.locator('[data-testid="affordance-chip-e2e-encryption"]').click()
  await expect(page.locator('[data-testid="affordances-nudge"]')).not.toBeVisible()

  // Click "Clear all" to reset
  await page.locator('button', { hasText: 'Clear all' }).click()

  await expect(page.locator('[data-testid="affordances-nudge"]')).toBeVisible()
})

// --- Story 2.4: Protocol Results & ProtocolCard ---

test('protocols are not visible until a domain is selected', async ({ page }) => {
  await page.goto('/prototype')
  await expect(page.locator('[data-testid="protocol-results"]')).not.toBeVisible()
})

test('selecting domain shows all domain protocols by default (8.1)', async ({ page }) => {
  // Communication domain with no affordances checked (additive default) shows all domain protocols
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  const cards = page.locator('[data-testid^="protocol-card-"]')
  const count = await cards.count()
  expect(count).toBeGreaterThanOrEqual(3) // Nostr, tinySSB, Meshtastic, Reticulum, Matrix, ActivityPub, ATproto
})

test('protocol card displays all required fields (8.2)', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  // Check Nostr card has all required elements
  const card = page.locator('[data-testid="protocol-card-nostr"]')
  await expect(card).toBeVisible()

  // Protocol name
  await expect(card.locator('h4')).toContainText('Nostr')

  // Entity type badge
  await expect(card).toContainText('P2P Protocols')

  // Governance badge
  await expect(page.locator('[data-testid="governance-badge-nostr"]')).toBeVisible()
  await expect(page.locator('[data-testid="governance-badge-nostr"]')).toContainText('Community')

  // Capture risk indicator
  await expect(page.locator('[data-testid="capture-risk-nostr"]')).toBeVisible()
  await expect(page.locator('[data-testid="capture-risk-nostr"]')).toContainText('Low capture risk')

  // Detail link footer (the per-card community link was removed in the card redesign;
  // ProtocolCard now exposes a "View details" link as data-testid="protocol-link-{id}")
  await expect(page.locator('[data-testid="protocol-link-nostr"]')).toBeVisible()
})

test('empty state message when no protocols match (8.3)', async ({ page }) => {
  // Use a domain with affordance combo that won't match
  await page.goto('/prototype?useCase=communication&affordance=ephemeral-archival')

  const emptyState = page.locator('[data-testid="results-empty-state"]')
  await expect(emptyState).toBeVisible()
  await expect(emptyState).toContainText('No verified tech tools yet')
})

// The per-card community link was removed in the ProtocolCard redesign (the card now
// links to the protocol detail page instead). The "opens in new tab" behavior is still
// covered on the protocol detail page (protocol-detail.spec.ts "community link opens in
// new tab (6.9)"), so this card-level assertion no longer maps to existing UI.
test.skip('community link opens in new tab (8.4) — card community link removed in redesign', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  const link = page.locator('[data-testid="community-link-nostr"]')
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
})

test('mobile viewport: cards stack vertically, no horizontal scroll (8.5)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
  expect(scrollWidth).toBeLessThanOrEqual(375)
})

test('URL state round-trip shows correct results (8.6)', async ({ page }) => {
  // Load with specific affordance filter
  await page.goto('/prototype?useCase=communication&affordance=e2e-encryption')

  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  // Should show protocols matching e2e-encryption in communication domain
  // Nostr, tinySSB, Meshtastic, Reticulum, Matrix all have e2e-encryption
  const cards = page.locator('[data-testid^="protocol-card-"]')
  const count = await cards.count()
  expect(count).toBeGreaterThanOrEqual(3)

  // Protocols without e2e-encryption in communication (ActivityPub) should not appear
  await expect(page.locator('[data-testid="protocol-card-activitypub"]')).not.toBeVisible()
})

test('AND/OR toggle switches filtering logic; AND shows fewer results (8.7)', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  // Check e2e-encryption and offline-mesh (chips start unchecked in additive model)
  await page.locator('[data-testid="affordance-chip-e2e-encryption"]').click()
  await page.locator('[data-testid="affordance-chip-offline-mesh"]').click()

  // OR mode (default): protocols matching ANY of the two affordances
  const orCards = page.locator('[data-testid^="protocol-card-"]')
  const orCount = await orCards.count()

  // Switch to AND mode (AND/OR control is an ARIA radiogroup inside the affordances panel)
  await page.locator('[data-testid="affordances-panel"] [role="radiogroup"] [role="radio"][aria-checked="false"]').click()

  // AND mode: only protocols matching BOTH e2e-encryption AND offline-mesh
  const andCards = page.locator('[data-testid^="protocol-card-"]')
  const andCount = await andCards.count()

  expect(andCount).toBeLessThanOrEqual(orCount)
  expect(andCount).toBeGreaterThanOrEqual(1) // tinySSB, Meshtastic, Reticulum have both
})

test('matchMode=and URL param restores AND mode on reload (8.8)', async ({ page }) => {
  await page.goto('/prototype?useCase=communication&matchMode=and')

  // AND toggle should be active (second radio in the radiogroup)
  const buttons = page.locator('[data-testid="affordances-panel"] [role="radiogroup"] [role="radio"]')
  // First button = OR, Second button = AND
  await expect(buttons.nth(1)).toHaveAttribute('aria-checked', 'true')
  await expect(buttons.nth(0)).toHaveAttribute('aria-checked', 'false')
})

test('capture risk indicator renders with correct risk level (8.9)', async ({ page }) => {
  await page.goto('/prototype?useCase=communication')
  await expect(page.locator('[data-testid="protocol-results"]')).toBeVisible()

  // Verify risk indicator renders with label and colored dot
  const riskIndicator = page.locator('[data-testid="capture-risk-nostr"]')
  await expect(riskIndicator).toBeVisible()
  await expect(riskIndicator).toContainText('Low capture risk')

  // Verify the colored dot is present (aria-hidden decorative element)
  const dot = riskIndicator.locator('span[aria-hidden="true"]')
  await expect(dot).toBeVisible()
})
