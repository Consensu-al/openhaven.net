import { test, expect } from '@playwright/test'

// --- Story 9.2 (embedded research docs) + Story 8.9 (research landing) ---
// Native research pages built from the `research` content collection, plus a
// /research landing linking the two embedded reports (internal) and the stack /
// monetary diagrams (external, link-only). pt-BR mirrors translate chrome only;
// the doc body + OpenHaven framing stay English (FR34).

// ============================================================
// Landing (EN) — Story 8.9
// ============================================================
test('research landing renders framing paragraph + internal report links (AC6)', async ({ page }) => {
  await page.goto('/research')

  // Framing paragraph (PageHeader subtitle = research.intro)
  const lede = page.locator('.page-subtitle')
  await expect(lede).toBeVisible()
  await expect(lede).not.toBeEmpty()

  // Internal links to each embedded report (scoped to main; nav has them too now)
  await expect(page.locator('main a[href="/research/mapping-infrastructure"]')).toBeVisible()
  await expect(page.locator('main a[href="/research/peerfunding"]')).toBeVisible()
})

test('research landing links to external diagrams in a new tab (AC7/AC8)', async ({ page }) => {
  await page.goto('/research')

  const external = page.locator('main a[target="_blank"]')
  expect(await external.count()).toBeGreaterThanOrEqual(3)

  // The known stack + monetary URLs are present, link-only.
  // Scoped to main: these URLs now also live in the nav Diagrams group (desktop +
  // mobile), so an unscoped locator would match 3 elements → strict-mode failure (⚑F2).
  await expect(page.locator('main a[href="https://sovereign-stack-model.netlify.app/"]')).toBeVisible()
  await expect(page.locator('main a[href="https://stack-model-entity-placement.netlify.app/"]')).toBeVisible()
  await expect(page.locator('main a[href="https://monetary-architecture.netlify.app/"]')).toBeVisible()

  // Every external link is safe (rel noopener) and announces the new tab (AC8)
  const first = external.first()
  await expect(first).toHaveAttribute('rel', /noopener/)
  await expect(first).toContainText('Opens in a new tab')
})

test('research overview leads with a Navigator + Matrix highlight + diagram summaries (AC4/AC5/AC6)', async ({ page }) => {
  await page.goto('/research')

  // Rename lands on the H1 (and, via the shared key, the breadcrumb)
  await expect(page.locator('h1.page-title')).toHaveText('Research Overview')

  // Visually-primary Key Tools highlight: Navigator + Matrix, each with a summary + link
  const navCard = page.locator('main a.key-tool-card[href="/prototype"]')
  const matrixCard = page.locator('main a.key-tool-card[href="/prototype/matrix"]')
  await expect(navCard).toBeVisible()
  await expect(matrixCard).toBeVisible()
  await expect(navCard).toContainText('Guided discovery')
  await expect(matrixCard).toContainText('full comparison table')

  // AC5 — each card carries the SHARED nav icon (compass/list). Assert the leading
  // .key-tool-icon specifically: the cards already had a .key-tool-arrow svg, so a bare
  // `svg` check would pass before any icon was added (⚑H2). Two svgs per card now.
  await expect(navCard.locator('.key-tool-icon')).toBeVisible()
  await expect(matrixCard.locator('.key-tool-icon')).toBeVisible()
  await expect(navCard.locator('svg')).toHaveCount(2)
  await expect(matrixCard.locator('svg')).toHaveCount(2)

  // Each diagram card now shows a short summary beneath its title (AC6)
  await expect(page.locator('main')).toContainText('interactive map of the sovereign-technology stack')
})

test('research landing groups Monetary under Reports, keeps 2 diagrams (AC6)', async ({ page }) => {
  await page.goto('/research')

  // Scoped to main (the same data-group values live in the nav too — ⚑F2). Monetary is an
  // external report card in the Reports group, located by href (collection cards share the
  // "Read the report" CTA — ⚑F11).
  await expect(page.locator('main [data-group="reports"] a[href="https://monetary-architecture.netlify.app/"]')).toBeVisible()

  // Diagrams keeps only the 2 stack diagrams — Monetary is NOT among them.
  await expect(page.locator('main [data-group="diagrams"] a[target="_blank"]')).toHaveCount(2)
  await expect(page.locator('main [data-group="diagrams"] a[href="https://monetary-architecture.netlify.app/"]')).toHaveCount(0)
})

test('research start-here caption is removed (AC3)', async ({ page }) => {
  await page.goto('/research')
  await expect(page.getByText('New to OpenHaven? Begin with the overview.')).toHaveCount(0)

  await page.goto('/pt-BR/research')
  await expect(page.getByText('Novo no OpenHaven? Comece pela visão geral.')).toHaveCount(0)
})

test('homepage primary CTA reads "Explore the Navigator" / "Explorar o Navegador" (AC7)', async ({ page }) => {
  await page.goto('/')
  const cta = page.locator('a.cta-primary[href="/prototype"]')
  await expect(cta).toBeVisible()
  await expect(cta).toContainText('Explore the Navigator')

  await page.goto('/pt-BR')
  const ctaPt = page.locator('a.cta-primary[href="/pt-BR/prototype"]')
  await expect(ctaPt).toBeVisible()
  await expect(ctaPt).toContainText('Explorar o Navegador')
})

// ============================================================
// Article pages (EN) — Story 9.2
// ============================================================
test('mapping article renders title, summary, local image, footnotes, attribution (AC1/2/3/5)', async ({ page }) => {
  await page.goto('/research/mapping-infrastructure')

  await expect(page.locator('h1.page-title')).toContainText('Report on Mapping Infrastructure')

  const lede = page.locator('.page-subtitle')
  await expect(lede).toBeVisible()
  await expect(lede).not.toBeEmpty()

  // Local image, no HackMD dependency
  await expect(page.locator('img[src="/research/mapping-infrastructure-pipeline.png"]')).toBeVisible()

  // GFM footnotes section renders
  await expect(page.locator('.research-article .footnotes')).toBeAttached()

  // Attribution + maintenance footer (no HackMD backlink — Decision 6)
  const attribution = page.locator('.research-attribution')
  await expect(attribution).toContainText('does not auto-update')
  await expect(attribution).toContainText('Brandon Nørgaard')
})

test('mapping article HTML has zero hackmd.io references (AC4)', async ({ page }) => {
  await page.goto('/research/mapping-infrastructure')
  const html = await page.content()
  expect(html).not.toContain('hackmd.io')
})

test('peerfunding article renders local image + preserved Purpose callout, zero hackmd (AC3/AC4)', async ({ page }) => {
  await page.goto('/research/peerfunding')

  await expect(page.locator('h1.page-title')).toContainText('Peerfunding and Commons-Based Finance')
  await expect(page.locator('img[src="/research/peerfunding-mechanisms.png"]')).toBeVisible()

  // Preserved authored provenance + Purpose callout (Decision 10)
  await expect(page.locator('.research-article')).toContainText('Primary source: P2P Foundation Wiki')
  await expect(page.locator('.research-article')).toContainText('This guide is oriented toward a practical question')

  const html = await page.content()
  expect(html).not.toContain('hackmd.io')
})

test('article page emits Article JSON-LD and a 3-level breadcrumb with a real /research link (AC14b)', async ({ page }) => {
  await page.goto('/research/mapping-infrastructure')

  // JSON-LD: an Article block parses
  const jsonLd = page.locator('script[type="application/ld+json"]')
  await expect(jsonLd.first()).toBeAttached()
  const raw = await jsonLd.first().textContent()
  const parsed = JSON.parse(raw!)
  const blocks = Array.isArray(parsed) ? parsed : [parsed]
  const article = blocks.find((b: any) => b['@type'] === 'Article')
  expect(article).toBeTruthy()
  expect(article.headline).toContain('Report on Mapping Infrastructure')

  // og:image (the local diagram) present
  const og = await page.locator('meta[property="og:image"]').getAttribute('content')
  expect(og).toContain('/research/mapping-infrastructure-pipeline.png')

  // Breadcrumb: the /research ancestor is a real link; only the title is current
  const researchCrumb = page.locator('[data-testid="breadcrumb-research"]')
  await expect(researchCrumb).toBeVisible()
  expect(await researchCrumb.getAttribute('href')).toBe('/research')
  await expect(page.locator('[data-testid="breadcrumb"] [aria-current="page"]')).toContainText('Report on Mapping Infrastructure')
})

// ============================================================
// Footer discoverability — Story 9.1 deferred, single Footer link (AC11)
// ============================================================
test('footer exposes a Research link on EN pages (AC11)', async ({ page }) => {
  await page.goto('/research')
  const link = page.locator('footer a.footer-link[href="/research"]')
  await expect(link).toBeVisible()
  await expect(link).toHaveText('Our Research')
})

// ============================================================
// pt-BR mirrors — i18n / FR34 (AC9/AC10)
// ============================================================
test('pt-BR landing: translated chrome, English framing, prefixed internal links (AC9/F4)', async ({ page }) => {
  await page.goto('/pt-BR/research')

  // Actual translated strings (a missing key would render the raw dot-path — F4)
  await expect(page.locator('h1.page-title')).toHaveText('Visão geral da Pesquisa')
  await expect(page.getByText('Ler o relatório').first()).toBeVisible()
  await expect(page.locator('footer a.footer-link[href="/pt-BR/research"]')).toHaveText('Nossa Pesquisa')

  // Framing paragraph stays English (FR34)
  await expect(page.locator('.page-subtitle')).toContainText('Research and reference materials')

  // Internal links carry the /pt-BR prefix (scoped to main; nav has them too now)
  await expect(page.locator('main a[href="/pt-BR/research/mapping-infrastructure"]')).toBeVisible()
  await expect(page.locator('main a[href="/pt-BR/research/peerfunding"]')).toBeVisible()
})

test('pt-BR article: locale notice visible, body still English (AC10/FR34)', async ({ page }) => {
  await page.goto('/pt-BR/research/mapping-infrastructure')

  // Locale indicator (pt-BR string)
  await expect(page.locator('.ra-locale')).toBeVisible()
  await expect(page.locator('.ra-locale')).toContainText('Este conteúdo é publicado em inglês.')

  // Body content is still English
  await expect(page.locator('.research-article')).toContainText('This document describes an architecture')

  // Breadcrumb ancestor link is prefixed
  const researchCrumb = page.locator('[data-testid="breadcrumb-research"]')
  expect(await researchCrumb.getAttribute('href')).toBe('/pt-BR/research')
})

// ============================================================
// Responsive — no horizontal scroll at 375px (AC13, Design Audit #6)
// ============================================================
// ============================================================
// Nav dropdown (interim top-level placement — re-evaluate in Story 9.1)
// ============================================================
test('nav Research dropdown opens to four titled groups in order (AC1/AC2)', async ({ page }) => {
  await page.goto('/research')

  const toggle = page.locator('#nav-research-toggle')
  const menu = page.locator('#nav-research-menu')
  await expect(toggle).toBeVisible()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeHidden()

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(menu).toBeVisible()

  // Four titled section labels (actual strings — a missing key renders the raw dot-path)
  await expect(menu.getByText('Start Here', { exact: true })).toBeVisible()
  await expect(menu.getByText('Key Tools', { exact: true })).toBeVisible()
  await expect(menu.getByText('Reports', { exact: true })).toBeVisible()
  await expect(menu.getByText('Diagrams', { exact: true })).toBeVisible()

  // Start Here → renamed Overview link + a "Start here" tag
  await expect(menu.locator('a[href="/research"]')).toContainText('Research Overview')
  await expect(menu.locator('.nav-dropdown-tag')).toHaveText('Start here')

  // Key Tools → Navigator + Matrix
  await expect(menu.locator('a[href="/prototype"]')).toBeVisible()
  await expect(menu.locator('a[href="/prototype/matrix"]')).toBeVisible()

  // Reports → each collection entry
  await expect(menu.locator('a[href="/research/mapping-infrastructure"]')).toBeVisible()
  await expect(menu.locator('a[href="/research/peerfunding"]')).toBeVisible()

  // External links → 3 total in the menu, each opens in a new tab. They're no longer all
  // "diagrams": 2 stack diagrams + the Monetary report (regrouped into Reports) (⚑L3).
  const externalLinks = menu.locator('a[target="_blank"]')
  await expect(externalLinks).toHaveCount(3)
  await expect(externalLinks.first()).toHaveAttribute('rel', /noopener/)

  // Grouping via container-scoped data-group hooks. The same data-group values also live on
  // the mobile nav + landing, so the locator MUST stay scoped to `menu` (⚑F2). Diagrams holds
  // the 2 stack diagrams; Monetary moved to Reports, located by href (the collection report
  // cards share the "Read the report" CTA, so a CTA-text locator would over-match — ⚑F11).
  await expect(menu.locator('[data-group="diagrams"] a[target="_blank"]')).toHaveCount(2)
  await expect(menu.locator('[data-group="diagrams"] a[href="https://sovereign-stack-model.netlify.app/"]')).toBeVisible()
  await expect(menu.locator('[data-group="diagrams"] a[href="https://stack-model-entity-placement.netlify.app/"]')).toBeVisible()
  await expect(menu.locator('[data-group="reports"] a[href="https://monetary-architecture.netlify.app/"]')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('mobile menu mirrors the four research groups + external diagrams (AC3)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/research')

  const hamburger = page.locator('#nav-toggle')
  const mobileMenu = page.locator('#nav-mobile-menu')
  await expect(hamburger).toBeVisible()
  await hamburger.click()
  await expect(mobileMenu).toBeVisible()

  // Scope to the research sublist — the mobile menu also holds the LanguageSwitcher,
  // which links to /research in the other locale (would double-match unscoped).
  const researchSub = mobileMenu.locator('.nav-mobile-sublist')

  // Same four titled groups as the desktop panel
  for (const label of ['Start Here', 'Key Tools', 'Reports', 'Diagrams']) {
    await expect(researchSub.getByText(label, { exact: true })).toBeVisible()
  }

  // Overview rename + "Start here" tag, the two tools, a report, and 3 external links total
  await expect(researchSub.locator('a[href="/research"]')).toContainText('Research Overview')
  await expect(researchSub.locator('.nav-dropdown-tag')).toHaveText('Start here')
  await expect(researchSub.locator('a[href="/prototype"]')).toBeVisible()
  await expect(researchSub.locator('a[href="/prototype/matrix"]')).toBeVisible()
  await expect(researchSub.locator('a[href="/research/mapping-infrastructure"]')).toBeVisible()
  await expect(researchSub.locator('a[target="_blank"]')).toHaveCount(3)

  // Grouping mirrors desktop, scoped to .nav-mobile-sublist (⚑F2): Diagrams = 2, Monetary in Reports.
  await expect(researchSub.locator('[data-group="diagrams"] a[target="_blank"]')).toHaveCount(2)
  await expect(researchSub.locator('[data-group="reports"] a[href="https://monetary-architecture.netlify.app/"]')).toBeVisible()
})

test('nav Research toggle is marked active on a research page', async ({ page }) => {
  await page.goto('/research/peerfunding')
  await expect(page.locator('#nav-research-toggle')).toHaveAttribute('aria-current', 'page')
})

test('nav dropdown: no permanent Navigator highlight; only the current page sub-item is active (AC1/AC2)', async ({ page }) => {
  await page.goto('/prototype')

  const toggle = page.locator('#nav-research-toggle')
  const menu = page.locator('#nav-research-menu')
  await toggle.click()
  await expect(menu).toBeVisible()

  // AC1 — the old filled-pill "primary" treatment is gone entirely (class no longer emitted).
  await expect(page.locator('.nav-dropdown-link--primary')).toHaveCount(0)

  // AC2 — exactly one sub-item is active: Navigator (the current page), nothing else.
  await expect(menu.locator('a[href="/prototype"]')).toHaveAttribute('aria-current', 'page')
  await expect(menu.locator('.nav-dropdown-link[aria-current="page"]')).toHaveCount(1)
})

test('pt-BR nav Research dropdown shows translated label + prefixed links', async ({ page }) => {
  await page.goto('/pt-BR/research')
  const toggle = page.locator('#nav-research-toggle')
  await expect(toggle).toContainText('Pesquisa')
  await toggle.click()
  await expect(
    page.locator('#nav-research-menu a[href="/pt-BR/research/mapping-infrastructure"]'),
  ).toBeVisible()
})

for (const width of [375, 768, 1024]) {
  test(`article has no horizontal scroll at ${width}px despite wide tables (AC13, Design Audit #6)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/research/peerfunding')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
}

// ============================================================
// Prototype hero badge removal (AC9)
// ============================================================
test('prototype hero badge pill is gone, DisclaimerBanner stays (AC9)', async ({ page }) => {
  await page.goto('/prototype')

  // The "Status: Prototype. Read the Stakeholder Brief." hero badge no longer renders
  await expect(page.locator('.hero-badge')).toHaveCount(0)

  // The beta DisclaimerBanner is untouched
  await expect(page.getByText('working draft').first()).toBeVisible()
})

test('pt-BR prototype hero badge pill is gone (AC9)', async ({ page }) => {
  await page.goto('/pt-BR/prototype')
  await expect(page.locator('.hero-badge')).toHaveCount(0)
})
