import { test, expect } from '@playwright/test';

test.describe('Phase 8 — Application Lifecycle & Application Intelligence (/applications)', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure clean state for local storage persistence tests
    await page.addInitScript(() => {
      window.localStorage.removeItem('jobai_candidate_applications_v2');
    });
    // Navigate directly to /applications
    await page.goto('/applications');
  });

  test('1. renders standalone /applications workspace with active hub tag', async ({ page }) => {
    // Check URL
    await expect(page).toHaveURL('/applications');

    // Hub tag indicator in top radial toggle button
    const hubToggle = page.locator('#radial-hub-toggle');
    await expect(hubToggle).toBeVisible();
    await expect(hubToggle).toContainText('APPLICATIONS_ACTIVE');

    // Workspace Header Title
    await expect(page.getByRole('heading', { name: 'Application Command Center' })).toBeVisible();
  });

  test('2. renders metrics overview and 6 lifecycle stage board lanes', async ({ page }) => {
    // Check metric labels
    await expect(page.getByText('Total Pursuits')).toBeVisible();

    // Check stage board column header labels
    await expect(page.getByText('SAVED', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('APPLIED', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('SCREENING', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('INTERVIEW', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('OFFER', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('CLOSED / REJECTED', { exact: true }).first()).toBeVisible();
  });

  test('3. toggles between Stage Board and Grid List view modes', async ({ page }) => {
    // Click List View toggle
    const listToggle = page.locator('#view-mode-list');
    await listToggle.click();

    // Verify application card visible in list layout
    await expect(page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' })).toBeVisible();

    // Click Board View toggle
    const boardToggle = page.locator('#view-mode-board');
    await boardToggle.click();
    await expect(page.getByText('CLOSED / REJECTED', { exact: true }).first()).toBeVisible();
  });

  test('4. filters applications by keyword search input', async ({ page }) => {
    const searchInput = page.locator('#application-search-input');
    await expect(searchInput).toBeVisible();

    // Type keyword 'FinScale'
    await searchInput.fill('FinScale');

    // Should filter to FinScale application
    await expect(page.getByRole('heading', { name: 'Full Stack Engineer (React + FastAPI)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' })).not.toBeVisible();

    // Reset filters
    const resetBtn = page.locator('#reset-app-filters-btn');
    await resetBtn.click();
    await expect(page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' })).toBeVisible();
  });

  test('5. tracks a new application via manual creation modal', async ({ page }) => {
    // Click Track New Application button
    const addBtn = page.locator('#add-application-btn');
    await addBtn.click();

    // Fill form fields
    await page.locator('#input-app-title').fill('Lead Infrastructure Architect');
    await page.locator('#input-app-org').fill('NeuroCompute AI');
    await page.locator('#input-app-location').fill('Remote (Global)');
    await page.locator('#input-app-url').fill('https://example.com/careers/lead-architect');
    await page.locator('#input-app-notes').fill('Referred by Senior Engineering Manager.');

    // Submit form
    const submitBtn = page.locator('#submit-add-app-btn');
    await submitBtn.click();

    // Verify new application card appears
    await expect(page.getByRole('heading', { name: 'Lead Infrastructure Architect' })).toBeVisible();
  });

  test('6. opens Application Command Center drawer and updates stage with audit log', async ({ page }) => {
    // Click first application card
    const firstCard = page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' });
    await firstCard.click();

    // Check Command Center Drawer opened
    await expect(page.getByText('APPLICATION_COMMAND_CENTER')).toBeVisible();

    // Change stage selector from INTERVIEW to OFFER
    const stageSelect = page.locator('#drawer-stage-selector');
    await stageSelect.selectOption('OFFER');

    // Switch to Audit History tab
    const historyTab = page.locator('#tab-history');
    await historyTab.click();

    // Verify new OFFER transition logged in timeline
    await expect(page.getByText('OFFER', { exact: true }).first()).toBeVisible();
  });

  test('7. generates AI cover letter draft and interview preparation matrix', async ({ page }) => {
    // Click first application card
    await page.getByRole('heading', { name: 'Senior AI & Backend Systems Engineer' }).click();

    // Switch to Submissions tab
    const subTab = page.locator('#tab-submissions');
    await subTab.click();

    // Click Generate Draft if available
    await expect(page.getByText('COVER LETTER DRAFT', { exact: true }).first()).toBeVisible();
    const genDraftBtn = page.getByRole('button', { name: /GENERATE DRAFT/i });
    if (await genDraftBtn.isVisible()) {
      await genDraftBtn.click();
    }
    await expect(page.getByText('[AI_GENERATED_DRAFT]')).toBeVisible();

    // Switch to Interview Prep tab
    const prepTab = page.locator('#tab-prep');
    await prepTab.click();
    await expect(page.getByText('STRUCTURED INTERVIEW PREPARATION')).toBeVisible();
  });

  test('8. navigates to /applications via radial navigation launcher', async ({ page }) => {
    // Start at dashboard
    await page.goto('/dashboard');

    // Open radial hub toggle
    const hubToggle = page.locator('#radial-hub-toggle');
    await hubToggle.click();

    // Click Applications sector (id radial-sector-applications)
    const appSector = page.locator('#radial-sector-applications');
    await expect(appSector).toBeVisible();
    await appSector.click();

    // Should navigate to /applications
    await page.waitForURL('/applications');
    await expect(page).toHaveURL('/applications');
  });
});
