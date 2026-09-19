import { test, expect } from '@playwright/test';

test.describe('JobAI Candidate Platform - Phase 3 Candidate Intelligence Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
  });

  // 1. Dashboard Render & Authoritative Identity Test
  test('Dashboard renders candidate identity surface, deterministic profile state, and user vectors', async ({ page }) => {
    await page.goto('/dashboard');

    // Header & Sub-header checks
    await expect(page.getByRole('button', { name: /Sign Out/i })).toBeVisible();

    // Authoritative Identity Header checks
    await expect(page.getByRole('heading', { name: /Shaik Rameez Basha|Alex Morgan/i })).toBeVisible();
    await expect(page.getByText(/shaikbasharam20@gmail\.com|shaikbashah20@gmail\.com|candidate@jobai\.io/i)).toBeVisible();
    await expect(page.getByText('[4 / 4 Foundational Fields Verified]')).toBeVisible();

    // Career Vectors
    await expect(page.getByText('Target Active Job Search Vector')).toBeVisible();
    await expect(page.getByText('Experienced Professional (3+ yrs)')).toBeVisible();
  });

  // 2. Spatial Intelligence Core & Inspector Matrix Test
  test('Dashboard renders Spatial Intelligence Core with honest state labels and active inspector', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'Spatial Intelligence Core' })).toBeVisible();
    await expect(page.getByText(/SPATIAL MATRIX VERIFIED|ANALYSIS PENDING/i)).toBeVisible();

    // Node buttons present
    await expect(page.getByRole('button', { name: /Candidate Profile/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Skill Matrix/i })).toBeVisible();

    // Click node and verify inspector detail
    await page.getByRole('button', { name: /Skill Matrix/i }).click();
    await expect(page.getByText('INSPECTOR_MATRIX')).toBeVisible();
  });

  // 3. Skill Passport Matrix Test
  test('Skill Passport Matrix displays capability passport and verified capabilities', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'SKILL PASSPORT' })).toBeVisible();
    await expect(page.getByText(/CAPABILITY_MATRIX|CAPABILITY MAP NOT INITIALIZED/i)).toBeVisible();
  });

  // 4. Skill Gap Intelligence Pipeline Test
  test('Skill Gap Intelligence renders target role pipeline and analysis matrix', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'SKILL GAP INTELLIGENCE' })).toBeVisible();
    await expect(page.getByText(/MATCH SCORE|TARGET ROLE ANALYSIS PENDING/i).first()).toBeVisible();
  });

  // 5. Opportunity Space Preview Test
  test('Opportunity Space Preview renders role clusters and opportunity matrix', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'OPPORTUNITY SPACE PREVIEW' })).toBeVisible();
    await expect(page.getByText(/VECTOR MATCHING|DEMO DATA/i)).toBeVisible();
  });

  // 6. Recommended Actions & Copilot Command Bar Test
  test('Recommended Actions checklist and Copilot Command Bar execute AI queries', async ({ page }) => {
    await page.goto('/dashboard');

    // Actions Checklist
    await expect(page.getByRole('heading', { name: 'RECOMMENDED ACTIONS' })).toBeVisible();
    await expect(page.getByText('Initialize Capability Passport')).toBeVisible();
    await expect(page.getByText('Complete Professional Identity')).toBeVisible();

    // Copilot Command Bar
    await expect(page.getByText('COPILOT_COMMAND_SURFACE')).toBeVisible();
    const quickCmdBtn = page.getByRole('button', { name: 'Improve Profile' });
    await expect(quickCmdBtn).toBeVisible();
    await quickCmdBtn.click();

    // Verify AI analysis output
    await expect(page.getByText('ANALYSIS_COMPLETE')).toBeVisible();
    await expect(page.getByText('RECOMMENDED TRAJECTORY')).toBeVisible();
  });

  // 7. Logout Flow Test
  test('Sign Out button triggers session logout and redirects to Sign In', async ({ page }) => {
    await page.goto('/dashboard');

    const logoutBtn = page.locator('#dashboard-logout-btn');
    await expect(logoutBtn).toBeVisible();
    await logoutBtn.click();

    await expect(page).toHaveURL('/login');
  });
});
