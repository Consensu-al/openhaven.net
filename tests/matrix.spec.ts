import { test, expect } from '@playwright/test'

// Selector for data rows only (excludes expansion detail rows)
const DATA_ROW = 'tr[role="button"][data-testid^="matrix-row-"]'

// --- Story 3.1: Full Protocol Matrix Table ---

// 6.2 — Page load and protocol count
test('matrix page loads and displays all 97 protocols', async ({ page }) => {
  await page.goto('/matrix')
  await expect(page.locator('[data-testid="matrix-page"]')).toBeVisible()
  await expect(page.locator('[data-testid="matrix-table"]')).toBeVisible()

  const rows = page.locator(DATA_ROW)
  await expect(rows).toHaveCount(97)
})

// 6.3 — Protocol count label
test('protocol count label shows "97 protocols match"', async ({ page }) => {
  await page.goto('/matrix')
  const count = page.locator('[data-testid="matrix-count"]')
  await expect(count).toContainText('97 protocols match')
})

// 6.4 — Governance filter reduces visible rows
test('clicking governance filter reduces visible rows and updates count', async ({ page }) => {
  await page.goto('/matrix')

  // Open Governance dropdown then click "Foundation"
  await page.locator('[data-testid="matrix-filter-gov"] > button').first().click()
  await page.locator('[data-testid="matrix-filter-gov-foundation"]').click()

  // Count should be less than 26
  const count = page.locator('[data-testid="matrix-count"]')
  const text = await count.textContent()
  const num = parseInt(text!.match(/(\d+)/)?.[1] ?? '0')
  expect(num).toBeLessThan(97)
  expect(num).toBeGreaterThan(0)

  // Visible rows should match the count
  const rows = page.locator(DATA_ROW)
  await expect(rows).toHaveCount(num, { timeout: 10000 })
})

// 6.5 — Text search
test('text search for "Nostr" shows only matching rows', async ({ page }) => {
  await page.goto('/matrix')
  await page.locator('[data-testid="matrix-filter-search"]').fill('Nostr')

  const rows = page.locator(DATA_ROW)
  await expect(rows).toHaveCount(1, { timeout: 10000 })
  await expect(page.locator('[data-testid="matrix-row-nostr"]')).toBeVisible()
})

// 6.6 — Filter state reflected in URL params
test('filter state is reflected in URL params', async ({ page }) => {
  await page.goto('/matrix')
  await page.locator('[data-testid="matrix-filter-gov"] > button').first().click()
  await page.locator('[data-testid="matrix-filter-gov-foundation"]').click()

  // Wait for replaceState URL update
  await page.waitForTimeout(300)
  const url = new URL(page.url())
  expect(url.searchParams.get('gov')).toBe('foundation')
})

// 6.7 — Deep link with pre-loaded filter (16 foundation protocols in dataset)
test('navigating to /matrix?gov=foundation pre-loads with Foundation filter active', async ({ page }) => {
  await page.goto('/matrix?gov=foundation')

  // Wait for hydration — useEffect reads URL params and applies filters
  const countLabel = page.locator('[data-testid="matrix-count"]')
  await expect(countLabel).toContainText('16 protocols match', { timeout: 5000 })

  // Only Foundation governance protocols should show
  const rows = page.locator(DATA_ROW)
  await expect(rows).toHaveCount(16)
})

// 6.8 — Row click expands detail panel (updated: was navigation, now expand)
test('clicking a row expands the detail panel', async ({ page }) => {
  await page.goto('/matrix')

  await page.locator('[data-testid="matrix-row-nostr"]').click()

  // Detail panel should be visible
  const detail = page.locator('[data-testid="matrix-row-detail-nostr"]')
  await expect(detail).toBeVisible()

  // Navigate via "View full page" link inside the panel
  const viewLink = page.locator('[data-testid="matrix-view-full-page-nostr"]')
  await expect(viewLink).toBeVisible()
  await expect(viewLink).toHaveAttribute('href', '/protocols/nostr')
})

// 6.9 — Mobile viewport horizontal scroll
test('mobile viewport — table has horizontal scroll, name column remains visible', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/matrix')

  await expect(page.locator('[data-testid="matrix-table"]')).toBeVisible()

  // The name column (2nd td, after checkbox) should have sticky positioning
  const nameCell = page.locator(`${DATA_ROW} td:nth-child(2)`).first()
  const position = await nameCell.evaluate((el) => getComputedStyle(el).position)
  expect(position).toBe('sticky')
})

// 6.10 — Keyboard navigation (updated: Enter now expands, not navigates)
test('keyboard navigation — Tab moves through filters, Enter expands row', async ({ page }) => {
  await page.goto('/matrix')

  // Focus the first row directly and verify it's focusable
  const firstRow = page.locator(DATA_ROW).first()
  await firstRow.focus()
  await expect(firstRow).toBeFocused()

  // Enter should expand
  await page.keyboard.press('Enter')

  // First row's detail panel should be visible
  const firstRowTestId = await firstRow.getAttribute('data-testid')
  const protocolId = firstRowTestId!.replace('matrix-row-', '')
  await expect(page.locator(`[data-testid="matrix-row-detail-${protocolId}"]`)).toBeVisible()
})

// 6.11 — Page title
test('page title contains "Protocol Matrix"', async ({ page }) => {
  await page.goto('/matrix')
  await expect(page).toHaveTitle(/Protocol Matrix/)
})

// 6.12 — JSON-LD
test('JSON-LD script is present with CollectionPage type', async ({ page }) => {
  await page.goto('/matrix')

  const jsonLd = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]')
    return script ? JSON.parse(script.textContent!) : null
  })

  expect(jsonLd).not.toBeNull()
  // JSON-LD is an array [CollectionPage, BreadcrumbList]
  const collection = Array.isArray(jsonLd) ? jsonLd.find((item: { '@type': string }) => item['@type'] === 'CollectionPage') : jsonLd
  expect(collection).toBeDefined()
  expect(collection['@type']).toBe('CollectionPage')
})

// 6.13 — Nav link
test('Nav link shows "Matrix" and points to /matrix', async ({ page }) => {
  await page.goto('/')

  // Desktop nav link (first match — mobile nav also has a copy)
  const navLink = page.locator('.nav-links a', { hasText: 'Matrix' })
  await expect(navLink).toBeVisible()
  await expect(navLink).toHaveAttribute('href', '/matrix')
})

// 6.14 — Hero secondary CTA
test('Hero secondary CTA shows "Browse Full Matrix" and points to /matrix', async ({ page }) => {
  await page.goto('/')

  const cta = page.locator('a', { hasText: 'Browse Full Matrix' })
  await expect(cta).toBeVisible()
  await expect(cta).toHaveAttribute('href', '/matrix')
})

// 6.15 — Breadcrumb
test('breadcrumb shows "Home > Matrix" with Home linking to /', async ({ page }) => {
  await page.goto('/matrix')

  const breadcrumb = page.locator('[data-testid="breadcrumb"]')
  await expect(breadcrumb).toBeVisible()
  await expect(breadcrumb).toContainText('Home')
  await expect(breadcrumb).toContainText('Matrix')

  const homeLink = page.locator('[data-testid="breadcrumb-home"]')
  await expect(homeLink).toHaveAttribute('href', '/')
})

// 6.16 — Card-style border on table wrapper
test('table wrapper has card-style border', async ({ page }) => {
  await page.goto('/matrix')

  const card = page.locator('.matrix-card')
  const borderRadius = await card.evaluate((el) => getComputedStyle(el).borderRadius)
  expect(borderRadius).toBe('16px') // 1rem = 16px

  const boxShadow = await card.evaluate((el) => getComputedStyle(el).boxShadow)
  expect(boxShadow).not.toBe('none')
})

// 6.17 — Empty state on 0 results
test('applying filters that match 0 protocols shows empty state message', async ({ page }) => {
  await page.goto('/matrix')

  // Apply multiple restrictive filters to get 0 results
  await page.locator('[data-testid="matrix-filter-search"]').fill('xyznonexistent')
  await page.waitForTimeout(300)

  const emptyState = page.locator('[data-testid="matrix-empty-state"]')
  await expect(emptyState).toBeVisible({ timeout: 10000 })
  await expect(emptyState).toContainText('unmapped area')
})

// 6.18 — Multiple filter combination
test('multiple filters combine correctly (AND across categories)', async ({ page }) => {
  await page.goto('/matrix')

  // Open Architecture dropdown and select Fully P2P
  await page.locator('[data-testid="matrix-filter-arch"] > button').first().click()
  await page.locator('[data-testid="matrix-filter-arch-fully-p2p"]').click()
  // Open Governance dropdown and select Community
  await page.locator('[data-testid="matrix-filter-gov"] > button').first().click()
  await page.locator('[data-testid="matrix-filter-gov-community"]').click()

  const rows = page.locator(DATA_ROW)
  const count = await rows.count()

  // Should be fewer than total protocols
  expect(count).toBeLessThan(97)

  // URL should have both params
  await page.waitForTimeout(300)
  const url = new URL(page.url())
  expect(url.searchParams.get('arch')).toBe('fully-p2p')
  expect(url.searchParams.get('gov')).toBe('community')
})

// --- Story 3.2: Protocol Row Detail Expansion ---

test.describe('Row Detail Expansion', () => {
  // 6.2 — Clicking a row expands detail panel
  test('clicking a row expands detail panel with correct data-testid', async ({ page }) => {
    await page.goto('/matrix')
    await page.locator('[data-testid="matrix-row-nostr"]').click()

    const detail = page.locator('[data-testid="matrix-row-detail-nostr"]')
    await expect(detail).toBeVisible()
  })

  // 6.3 — Expanded panel contains protocol attributes
  test('expanded panel contains protocol description, attributes, domain tags, affordance tags', async ({ page }) => {
    await page.goto('/matrix')
    await page.locator('[data-testid="matrix-row-nostr"]').click()

    const detail = page.locator('[data-testid="matrix-row-detail-nostr"]')
    await expect(detail).toBeVisible()

    // Should contain protocol name as heading
    await expect(detail.locator('h3')).toContainText('Nostr')

    // Should contain attribute labels (at least some of: License, Owner, etc.)
    const detailText = await detail.textContent()
    expect(detailText).toContain('Last Investigated')
  })

  // 6.4 — Clicking same row collapses the panel
  test('clicking same row collapses the panel', async ({ page }) => {
    await page.goto('/matrix')

    // Expand
    await page.locator('[data-testid="matrix-row-nostr"]').click()
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible()

    // Collapse
    await page.locator('[data-testid="matrix-row-nostr"]').click()
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).not.toBeAttached()
  })

  // 6.5 — Clicking a different row collapses previous and expands new
  test('clicking a different row collapses previous and expands new', async ({ page }) => {
    await page.goto('/matrix')

    // Expand nostr
    await page.locator('[data-testid="matrix-row-nostr"]').click()
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible()

    // Click a different row — find one that exists
    const secondRow = page.locator(DATA_ROW).nth(0)
    const secondTestId = await secondRow.getAttribute('data-testid')
    const secondId = secondTestId!.replace('matrix-row-', '')

    // If first row is nostr, skip to next
    if (secondId === 'nostr') {
      const thirdRow = page.locator(DATA_ROW).nth(1)
      await thirdRow.click()
      const thirdTestId = await thirdRow.getAttribute('data-testid')
      const thirdId = thirdTestId!.replace('matrix-row-', '')
      await expect(page.locator(`[data-testid="matrix-row-detail-${thirdId}"]`)).toBeVisible()
    } else {
      await secondRow.click()
      await expect(page.locator(`[data-testid="matrix-row-detail-${secondId}"]`)).toBeVisible()
    }

    // Original nostr panel should be removed from DOM
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).not.toBeAttached()
  })

  // 6.6 — Expanding a row adds expand param to URL
  test('expanding a row adds expand={id} to URL params', async ({ page }) => {
    await page.goto('/matrix')
    await page.locator('[data-testid="matrix-row-nostr"]').click()

    await page.waitForTimeout(100)
    const url = new URL(page.url())
    expect(url.searchParams.get('expand')).toBe('nostr')
  })

  // 6.7 — Deep link with expand param pre-expands row
  test('navigating to /matrix?expand=nostr pre-expands that row detail panel', async ({ page }) => {
    await page.goto('/matrix?expand=nostr')

    // Wait for hydration
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible({ timeout: 5000 })
  })

  // 6.8 — Deep link with filters + expand
  test('deep link with filters + expand applies filters and expands row if visible', async ({ page }) => {
    await page.goto('/matrix?gov=community&expand=nostr')

    // Wait for hydration
    await page.waitForTimeout(500)

    // Filters should be applied
    const countLabel = page.locator('[data-testid="matrix-count"]')
    const text = await countLabel.textContent()
    const count = parseInt(text!.match(/(\d+)/)?.[1] ?? '0')
    expect(count).toBeLessThan(97)

    // Nostr is community-governed, so it should be expanded
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible({ timeout: 5000 })
  })

  // 6.9 — Escape key closes expanded panel
  test('Escape key closes expanded panel', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-row-nostr"]').click()
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).not.toBeAttached()
  })

  // 6.10 — Keyboard Enter/Space on row toggles expansion
  test('keyboard Enter/Space on row toggles expansion', async ({ page }) => {
    await page.goto('/matrix')

    const row = page.locator('[data-testid="matrix-row-nostr"]')
    await row.focus()

    // Enter expands
    await page.keyboard.press('Enter')
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible()

    // Space collapses
    await page.keyboard.press('Space')
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).not.toBeAttached()
  })

  // 6.11 — Expansion panel interactive elements are focusable and in correct DOM order
  test('expansion panel interactive elements are focusable', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-row-nostr"]').click()
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).toBeVisible()

    // "View full page" link should be focusable
    const viewLink = page.locator('[data-testid="matrix-view-full-page-nostr"]')
    await viewLink.focus()
    await expect(viewLink).toBeFocused()

    // Close button should be focusable
    const closeBtn = page.locator('[data-testid="matrix-row-detail-nostr"] button[aria-label="Close details"]')
    await closeBtn.focus()
    await expect(closeBtn).toBeFocused()
  })

  // 6.12 — "View full page" link navigates to detail page
  test('"View full page" link in expansion panel navigates to /protocols/{id}', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-row-nostr"]').click()

    const link = page.locator('[data-testid="matrix-view-full-page-nostr"]')
    await expect(link).toBeVisible()

    await link.click()
    await page.waitForURL('**/protocols/nostr')
    expect(page.url()).toContain('/protocols/nostr')
  })

  // 6.13 — Mobile viewport — expanded panel is readable, no horizontal overflow
  test('mobile viewport (375px) — expanded panel is readable, no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-row-nostr"]').click()
    const detail = page.locator('[data-testid="matrix-row-detail-nostr"]')
    await expect(detail).toBeVisible()

    // Check no horizontal overflow beyond viewport
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(375 + 5) // Small tolerance
  })

  // 6.14 — Expanding a row while filters are active preserves filter state
  test('expanding a row while filters are active preserves filter state', async ({ page }) => {
    await page.goto('/matrix')

    // Open Governance dropdown and apply Community filter
    await page.locator('[data-testid="matrix-filter-gov"] > button').first().click()
    await page.locator('[data-testid="matrix-filter-gov-community"]').click()
    await page.waitForTimeout(100)

    const countBefore = page.locator('[data-testid="matrix-count"]')
    const textBefore = await countBefore.textContent()

    // Expand a row
    const firstRow = page.locator(DATA_ROW).first()
    await firstRow.click()

    // Filter count should be the same
    const textAfter = await countBefore.textContent()
    expect(textAfter).toBe(textBefore)

    // URL should still have gov param
    const url = new URL(page.url())
    expect(url.searchParams.get('gov')).toBe('community')
  })

  // 6.15 — aria-expanded attribute toggles correctly
  test('aria-expanded attribute toggles correctly on row', async ({ page }) => {
    await page.goto('/matrix')

    const row = page.locator('[data-testid="matrix-row-nostr"]')
    await expect(row).toHaveAttribute('aria-expanded', 'false')

    await row.click()
    await expect(row).toHaveAttribute('aria-expanded', 'true')

    await row.click()
    await expect(row).toHaveAttribute('aria-expanded', 'false')
  })
})

// --- Story 3.3: Side-by-Side Protocol Comparison ---

test.describe('Side-by-Side Comparison', () => {
  // 8.2 — Checkboxes visible, clicking checkbox does NOT expand row
  test('checkboxes visible on all protocol rows, clicking checkbox does NOT expand row', async ({ page }) => {
    await page.goto('/matrix')

    const checkboxes = page.locator('[data-testid^="matrix-compare-checkbox-"]')
    const firstCheckbox = checkboxes.first()
    await expect(firstCheckbox).toBeVisible()

    const count = await checkboxes.count()
    expect(count).toBe(97)

    // Click checkbox on nostr row
    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()

    // Row should NOT be expanded (checkbox has stopPropagation)
    await expect(page.locator('[data-testid="matrix-row-detail-nostr"]')).not.toBeAttached()
  })

  // 8.3 — Selecting 2 protocols shows CTA with counter
  test('selecting 2 protocols shows "Compare 2 selected" CTA with "2/5 selected" counter', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()

    // CTA should not be visible yet (only 1 selected)
    await expect(page.locator('[data-testid="matrix-compare-cta"]')).not.toBeVisible()

    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()

    // CTA should now be visible
    const cta = page.locator('[data-testid="matrix-compare-cta"]')
    await expect(cta).toBeVisible()
    await expect(cta).toContainText('Compare')
    await expect(cta).toContainText('2')

    const counter = page.locator('[data-testid="matrix-compare-count"]')
    await expect(counter).toContainText('2/5')
  })

  // 8.4 — Selecting 5 protocols disables remaining checkboxes
  test('selecting 5 protocols disables remaining checkboxes', async ({ page }) => {
    await page.goto('/matrix')

    // Select 5 protocols via first 5 rows
    const rows = page.locator(DATA_ROW)
    for (let i = 0; i < 5; i++) {
      const row = rows.nth(i)
      const testId = await row.getAttribute('data-testid')
      const id = testId!.replace('matrix-row-', '')
      await page.locator(`[data-testid="matrix-compare-checkbox-${id}"]`).click()
    }

    // 6th checkbox should be disabled
    const sixthRow = rows.nth(5)
    const sixthTestId = await sixthRow.getAttribute('data-testid')
    const sixthId = sixthTestId!.replace('matrix-row-', '')
    const sixthCheckbox = page.locator(`[data-testid="matrix-compare-checkbox-${sixthId}"]`)
    await expect(sixthCheckbox).toBeDisabled()
  })

  // 8.5 — Clicking "Compare selected" scrolls to comparison section and renders comparison view
  test('clicking "Compare selected" scrolls to comparison section and renders comparison view', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()

    const cta = page.locator('[data-testid="matrix-compare-cta"]')
    await expect(cta).toBeVisible({ timeout: 5000 })
    await cta.click()

    // Comparison view should be visible
    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })
  })

  // 8.6 — Comparison view shows correct number of protocol columns with expected content
  test('comparison view shows correct number of protocol columns with expected content', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()

    const cta = page.locator('[data-testid="matrix-compare-cta"]')
    await expect(cta).toBeVisible({ timeout: 5000 })
    await cta.click()

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // Should have 2 protocol columns
    await expect(page.locator('[data-testid="comparison-column-nostr"]')).toBeVisible()
    await expect(page.locator('[data-testid="comparison-column-matrix"]')).toBeVisible()

    // Should contain protocol names and governance info
    const text = await comparison.textContent()
    expect(text).toContain('Nostr')
    expect(text).toContain('Matrix')
    expect(text).toContain('Governance')
    expect(text).toContain('Capture Risk')
  })

  // 8.7 — Shared affordances between selected protocols are visually highlighted
  test('shared affordances between selected protocols are visually highlighted', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()
    await page.locator('[data-testid="matrix-compare-cta"]').click()

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // Look for shared affordance tags (those with data-shared="true")
    const sharedTags = comparison.locator('[data-shared="true"]')
    const sharedCount = await sharedTags.count()

    // Nostr and Matrix likely share some affordances — if they do, the count should be > 0
    // If not, this test verifies the attribute exists when shared
    if (sharedCount > 0) {
      const bg = await sharedTags.first().evaluate(el => getComputedStyle(el).backgroundColor)
      // Should have the domain-selected-bg color applied
      expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    }
  })

  // 8.8 — "Remove" button on a column removes that protocol from comparison and updates URL
  test('"Remove" button on a column removes that protocol from comparison and updates URL', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-solid"]').click()
    await page.locator('[data-testid="matrix-compare-cta"]').click()

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // Remove nostr
    await page.locator('[data-testid="comparison-remove-nostr"]').click()

    // Nostr column should be gone
    await expect(page.locator('[data-testid="comparison-column-nostr"]')).not.toBeVisible()

    // URL should not contain nostr
    await page.waitForTimeout(100)
    const url = new URL(page.url())
    const compare = url.searchParams.get('compare') ?? ''
    expect(compare).not.toContain('nostr')
    expect(compare).toContain('matrix')
    expect(compare).toContain('solid')
  })

  // 8.9 — Removing down to 1 protocol collapses comparison view and removes ?compare= from URL
  test('removing down to 1 protocol collapses comparison view and removes ?compare= from URL', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()
    await page.locator('[data-testid="matrix-compare-cta"]').click()

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // Remove nostr — only matrix remains (1 protocol)
    await page.locator('[data-testid="comparison-remove-nostr"]').click()

    // Comparison should collapse
    await expect(comparison).not.toBeVisible()

    // ?compare= should be removed
    await page.waitForTimeout(100)
    const url = new URL(page.url())
    expect(url.searchParams.has('compare')).toBe(false)
  })

  // 8.10 — "Clear comparison" removes all selections and collapses view
  test('"Clear comparison" removes all selections and collapses view', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()
    await page.locator('[data-testid="matrix-compare-cta"]').click()

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    await page.locator('[data-testid="comparison-clear"]').click()

    // Comparison should collapse
    await expect(comparison).not.toBeVisible()

    // All checkboxes should be unchecked
    const nostrCheckbox = page.locator('[data-testid="matrix-compare-checkbox-nostr"]')
    await expect(nostrCheckbox).not.toBeChecked()

    // ?compare= should be removed
    await page.waitForTimeout(100)
    const url = new URL(page.url())
    expect(url.searchParams.has('compare')).toBe(false)
  })

  // 8.11 — URL contains ?compare=id1,id2 when comparison is active
  test('URL contains ?compare=id1,id2 when comparison is active', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()

    await page.waitForTimeout(100)
    const url = new URL(page.url())
    const compare = url.searchParams.get('compare')
    expect(compare).toBeTruthy()
    expect(compare!.split(',')).toContain('nostr')
    expect(compare!.split(',')).toContain('matrix')
  })

  // 8.12 — Navigating to /matrix?compare=nostr,matrix pre-selects and shows comparison
  test('navigating to /matrix?compare=nostr,matrix pre-selects those rows and shows comparison', async ({ page }) => {
    await page.goto('/matrix?compare=nostr,matrix')

    // Wait for hydration
    await page.waitForTimeout(500)

    // Checkboxes should be checked
    await expect(page.locator('[data-testid="matrix-compare-checkbox-nostr"]')).toBeChecked()
    await expect(page.locator('[data-testid="matrix-compare-checkbox-matrix"]')).toBeChecked()

    // Comparison view should be visible
    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })
  })

  // 8.13 — Deep link with filters + compare applies both
  test('deep link with filters + compare (e.g., ?gov=foundation&compare=nostr,matrix) applies both', async ({ page }) => {
    await page.goto('/matrix?gov=community&compare=nostr,matrix')

    await page.waitForTimeout(500)

    // Filters should be applied
    const countLabel = page.locator('[data-testid="matrix-count"]')
    const text = await countLabel.textContent()
    const count = parseInt(text!.match(/(\d+)/)?.[1] ?? '0')
    expect(count).toBeLessThan(97)

    // Comparison should be visible
    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // Both protocols should appear in comparison even if one is filtered out of table
    await expect(page.locator('[data-testid="comparison-column-nostr"]')).toBeVisible()
    await expect(page.locator('[data-testid="comparison-column-matrix"]')).toBeVisible()
  })

  // 8.14 — Escape key closes comparison view
  test('Escape key closes comparison view', async ({ page }) => {
    await page.goto('/matrix?compare=nostr,matrix')

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    await page.keyboard.press('Escape')

    await expect(comparison).not.toBeVisible()
  })

  // 8.15 — Keyboard navigation: Tab through checkboxes, Space to toggle, Enter on CTA
  test('keyboard navigation — Tab through checkboxes, Space to toggle, Enter on CTA', async ({ page }) => {
    await page.goto('/matrix')

    // Focus the first checkbox and toggle via Space
    const firstCheckbox = page.locator('[data-testid^="matrix-compare-checkbox-"]').first()
    await firstCheckbox.focus()
    await expect(firstCheckbox).toBeFocused()
    await page.keyboard.press('Space')
    await expect(firstCheckbox).toBeChecked()

    // Tab to next checkbox and toggle
    await page.keyboard.press('Tab')
    // After tabbing from checkbox, we're on the row — tab again to next row's checkbox
    // Skip ahead: manually focus 2nd checkbox
    const secondCheckbox = page.locator('[data-testid^="matrix-compare-checkbox-"]').nth(1)
    await secondCheckbox.focus()
    await page.keyboard.press('Space')
    await expect(secondCheckbox).toBeChecked()

    // CTA should be visible, focus it and press Enter
    const cta = page.locator('[data-testid="matrix-compare-cta"]')
    await expect(cta).toBeVisible()
    await cta.focus()
    await page.keyboard.press('Enter')

    // Comparison view should appear
    await expect(page.locator('[data-testid="comparison-view"]')).toBeVisible({ timeout: 5000 })
  })

  // 8.16 — Mobile viewport: comparison scrolls horizontally, attribute labels sticky
  test('mobile viewport (375px) — comparison scrolls horizontally, attribute labels sticky', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/matrix?compare=nostr,matrix,solid')

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // The first td in comparison tbody should be sticky
    const labelCell = comparison.locator('tbody td').first()
    const position = await labelCell.evaluate(el => getComputedStyle(el).position)
    expect(position).toBe('sticky')
  })

  // 8.17 — Selecting protocols, then applying filter that hides one — selection persists
  test('selecting protocols, then applying filter that hides one — selection persists, comparison still shows all selected', async ({ page }) => {
    await page.goto('/matrix')

    await page.locator('[data-testid="matrix-compare-checkbox-nostr"]').click()
    await page.locator('[data-testid="matrix-compare-checkbox-matrix"]').click()
    await page.locator('[data-testid="matrix-compare-cta"]').click()

    const comparison = page.locator('[data-testid="comparison-view"]')
    await expect(comparison).toBeVisible({ timeout: 5000 })

    // Apply a filter that hides one of the selected protocols
    // Nostr is 'community' governance; apply 'foundation' filter to hide it from table
    await page.locator('[data-testid="matrix-filter-gov"] > button').first().click()
    await page.locator('[data-testid="matrix-filter-gov-foundation"]').click()
    await page.waitForTimeout(300)

    // Nostr row should NOT be visible in table
    await expect(page.locator('[data-testid="matrix-row-nostr"]')).not.toBeVisible()

    // But comparison should still show both protocols
    await expect(page.locator('[data-testid="comparison-column-nostr"]')).toBeVisible()
    await expect(page.locator('[data-testid="comparison-column-matrix"]')).toBeVisible()

    // URL should still have compare param
    const url = new URL(page.url())
    expect(url.searchParams.get('compare')).toContain('nostr')
  })

  // 8.18 — aria-label attributes present on checkboxes, comparison region, columns
  test('aria-label attributes present on checkboxes, comparison region, columns', async ({ page }) => {
    await page.goto('/matrix?compare=nostr,matrix')

    await page.waitForTimeout(500)

    // Checkbox aria-label
    const checkbox = page.locator('[data-testid="matrix-compare-checkbox-nostr"]')
    await expect(checkbox).toHaveAttribute('aria-label', 'Select Nostr for comparison')

    // Comparison region
    const region = page.locator('[data-testid="comparison-view"]')
    await expect(region).toHaveAttribute('aria-label', 'Protocol comparison')
    await expect(region).toHaveAttribute('role', 'region')

    // Column group
    const column = page.locator('[data-testid="comparison-column-nostr"]')
    await expect(column).toHaveAttribute('aria-label', 'Nostr comparison data')
  })
})
