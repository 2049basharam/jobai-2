import { test, expect } from '@playwright/test';

test.describe('Phase 7 — Opportunity Intelligence Workspace (/opportunities)', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure clean state for saved opportunities persistence
    await page.addInitScript(() => {
      window.localStorage.removeItem('jobai_saved_opportunities_v2');
    });
    // Navigate directly to /opportunities
    await page.goto('/opportunities');
  });

  test('1. renders standalone /opportunities workspace with active hub tag', async ({ page }) => {
    // Check URL
    await expect(page).toHaveURL('/opportunities');

    // Hub tag indicator in top radial toggle button
    const hubToggle = page.locator('#radial-hub-toggle');
    await expect(hubToggle).toBeVisible();
    await expect(hubToggle).toContainText('OPPORTUNITY_ACTIVE');

    // Workspace Header Title
    await expect(page.getByRole('heading', { name: 'Opportunity Intelligence Radar' })).toBeVisible();
  });

  test('2. displays data source provenance banner and illustrative preview warning', async ({ page }) => {
    // Banner header tag
    await expect(page.getByText('[ILLUSTRATIVE_OPPORTUNITY_PREVIEW]').first()).toBeVisible();

    // Provenance verification tag
    await expect(page.getByText('PROVENANCE_VERIFIED').first()).toBeVisible();

    // Check opportunity card source label badge
    await expect(page.getByText('[ILLUSTRATIVE_DEMO_SOURCE]').first()).toBeVisible();
  });

  test('3. displays candidate trajectory context from profile', async ({ page }) => {
    // Check trajectory details
    await expect(page.getByText('Target Direction:').first()).toBeVisible();
    await expect(page.getByText('Stage:').first()).toBeVisible();
    await expect(page.getByText('Work Mode:').first()).toBeVisible();
  });

  test('4. filters opportunities by keyword search', async ({ page }) => {
    const searchInput = page.locator('#opportunity-search-input');
    await expect(searchInput).toBeVisible();

    // Type keyword 'React'
    await searchInput.fill('React');

    // Should filter to Full Stack Engineer (React + FastAPI)
    await expect(page.getByText('Full Stack Engineer (React + FastAPI)')).toBeVisible();
    await expect(page.getByText('Machine Learning Operations')).not.toBeVisible();

    // Reset filters
    const resetBtn = page.locator('#reset-filters-btn');
    await resetBtn.click();
    await expect(page.getByText('Machine Learning Operations (MLOps) Engineer')).toBeVisible();
  });

  test('5. filters opportunities by work mode dropdown', async ({ page }) => {
    const workModeSelect = page.locator('#filter-workmode');
    await expect(workModeSelect).toBeVisible();

    // Select Remote Only
    await workModeSelect.selectOption('remote');

    // Verify remote roles visible
    await expect(page.getByText('Full Stack Engineer (React + FastAPI)')).toBeVisible();
    // On-site role should be hidden
    await expect(page.getByText('Lead Python Backend Infrastructure Architect')).not.toBeVisible();
  });

  test('6. opens opportunity detail drawer and displays evidence alignment model', async ({ page }) => {
    // Click first opportunity card
    const firstOppTitle = page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' });
    await firstOppTitle.click();

    // Drawer should open
    await expect(page.getByText('OPPORTUNITY_INTELLIGENCE_RECORD')).toBeVisible();

    // Alignment breakdown
    await expect(page.getByText('DETERMINISTIC ALIGNMENT MODEL')).toBeVisible();
    await expect(page.getByText('MATCHED REQUIRED CAPABILITIES')).toBeVisible();
    await expect(page.getByText('SUPPORTING CANDIDATE PROJECTS')).toBeVisible();
    await expect(page.getByText('ROLE OVERVIEW & RESPONSIBILITIES')).toBeVisible();

    // Close drawer using close button
    const closeBtn = page.locator('button').filter({ has: page.locator('.lucide-x') }).first();
    await closeBtn.click();
    await expect(page.getByText('OPPORTUNITY_INTELLIGENCE_RECORD')).not.toBeVisible();
  });

  test('7. toggles saving an opportunity and filters by saved roles', async ({ page }) => {
    await page.goto('/opportunities');
    await page.evaluate(() => {
      localStorage.removeItem('jobai_saved_opportunities_v2');
      localStorage.removeItem('jobai_saved_opps');
    });
    await page.reload();

    // Click bookmark button on first card (opp-001)
    const bookmarkBtn = page.locator('#save-opp-opp-001');
    await bookmarkBtn.click({ force: true });

    // Wait for React state update to complete (title changes to Unsave Opportunity)
    await expect(page.locator('#save-opp-opp-001[title="Unsave Opportunity"]')).toBeVisible({ timeout: 10000 });

    // Check saved count filter button has updated label
    const savedFilterBtn = page.locator('#toggle-saved-filter');
    await expect(savedFilterBtn).toBeVisible({ timeout: 10000 });

    // Toggle saved filter
    await savedFilterBtn.scrollIntoViewIfNeeded();
    await savedFilterBtn.click({ force: true });
    await expect(page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' })).toBeVisible({ timeout: 10000 });
  });

  test('8. navigates to /opportunities via radial navigation launcher', async ({ page }) => {
    // Start at dashboard
    await page.goto('/dashboard');

    // Open radial hub toggle
    const hubToggle = page.locator('#radial-hub-toggle');
    await hubToggle.click();

    // Click Opportunities sector (id radial-sector-opportunities)
    const oppSector = page.locator('#radial-sector-opportunities');
    await expect(oppSector).toBeVisible();
    await oppSector.click();

    // Should navigate to /opportunities
    await page.waitForURL('/opportunities');
    await expect(page).toHaveURL('/opportunities');
  });
});
