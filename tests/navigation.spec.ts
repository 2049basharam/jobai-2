import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('JobAI Candidate Platform — Global Spatial Application Navigation Architecture', () => {
  test('Public pages do NOT render RadialNavMenu', async ({ page }) => {
    // 1. Landing Page
    await page.goto('/');
    await expect(page.locator('#radial-hub-toggle')).not.toBeVisible();

    // 2. Login Page
    await page.goto('/login');
    await expect(page.locator('#radial-hub-toggle')).not.toBeVisible();

    // 3. Register Page
    await page.goto('/register');
    await expect(page.locator('#radial-hub-toggle')).not.toBeVisible();

    // 4. Forgot Password Page
    await page.goto('/forgot-password');
    await expect(page.locator('#radial-hub-toggle')).not.toBeVisible();
  });

  test('Dashboard route renders CandidateAppShell and RadialNavMenu', async ({ page }) => {
    await page.goto('/dashboard');

    const hubToggle = page.locator('#radial-hub-toggle');
    await expect(hubToggle).toBeVisible();
    await expect(hubToggle).toContainText('DASHBOARD_ACTIVE');

    // Expand wheel
    await hubToggle.click();
    await expect(page.locator('#radial-sector-dashboard')).toBeVisible();

    // Verify active sector styling on dashboard
    const dashboardSector = page.locator('#radial-sector-dashboard');
    await expect(dashboardSector).toContainText('Dashboard');
    await expect(dashboardSector).toContainText('[01]');
  });

  test('Profile route renders CandidateAppShell, active Identity state, and contextual sub-nav', async ({ page }) => {
    await page.goto('/profile');

    const hubToggle = page.locator('#radial-hub-toggle');
    await expect(hubToggle).toBeVisible();
    await expect(hubToggle).toContainText('IDENTITY');

    // Expand wheel
    await hubToggle.click();
    await expect(page.locator('#radial-sector-identity')).toBeVisible();

    // Verify contextual sub-navigation sections
    await expect(page.getByText('PROFILE_CONTEXTUAL_SECTIONS')).toBeVisible();
    await expect(page.locator('button:has-text("#identity")')).toBeVisible();
    await expect(page.locator('button:has-text("#experience")')).toBeVisible();
    await expect(page.locator('button:has-text("#projects")')).toBeVisible();
  });

  test('Future modules render honest MODULE_STANDBY state and disabled interaction', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('#radial-hub-toggle').click();

    // Verify Skill Passport sector is active
    const skillsSector = page.locator('#radial-sector-skills');
    await expect(skillsSector).toBeVisible();
    await expect(skillsSector).toContainText('Skill Passport');
    await expect(skillsSector).toBeEnabled();

    // Verify Career Vector sector is standby
    const careerSector = page.locator('#radial-sector-career');
    await expect(careerSector).toBeVisible();
    await expect(careerSector).toContainText('Career Vector');
    await expect(careerSector).toContainText('MODULE_STANDBY');
    await expect(careerSector).toBeDisabled();

    // Verify Opportunities sector is active
    const oppSector = page.locator('#radial-sector-opportunities');
    await expect(oppSector).toBeVisible();
    await expect(oppSector).toContainText('Opportunities');
    await expect(oppSector).toBeEnabled();

    // Verify Applications sector is active
    const appSector = page.locator('#radial-sector-applications');
    await expect(appSector).toBeVisible();
    await expect(appSector).toContainText('Applications');
    await expect(appSector).toBeEnabled();
  });

  test('RadialNavMenu navigates cleanly between authenticated application routes', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('#radial-hub-toggle').click();

    // Click Identity sector to navigate to /profile
    await page.locator('#radial-sector-identity').click();
    await page.waitForURL('**/profile');
    expect(page.url()).toContain('/profile');
  });
});
