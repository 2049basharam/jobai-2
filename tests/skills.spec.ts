import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('JobAI Candidate Platform — Phase 6 Digital Skill Passport & Evidence Intelligence', () => {
  // 1. Navigation & Workspace Identification
  test('Skills route renders Digital Skill Passport, metrics, and active radial navigator', async ({ page }) => {
    await page.goto('/skills');

    // Header & Identity
    await expect(page.getByRole('heading', { name: 'Digital Skill Passport' })).toBeVisible();
    await expect(page.getByText('[DIGITAL_SKILL_PASSPORT]')).toBeVisible();
    await expect(page.getByText('Shaik Rameez Basha', { exact: true }).first()).toBeVisible();

    // Radial Application Navigator on /skills
    const hubToggle = page.locator('#radial-hub-toggle');
    await expect(hubToggle).toBeVisible();
    await expect(hubToggle).toContainText('SKILLS_ACTIVE');
  });

  // 2. Capability Overview Metrics & Capability Map
  test('Skills overview metrics and capability taxonomy map render correctly', async ({ page }) => {
    await page.goto('/skills');

    // Metrics
    await expect(page.getByText('TOTAL CAPABILITIES')).toBeVisible();
    await expect(page.getByText('EVIDENCED SKILLS')).toBeVisible();
    await expect(page.getByText('PROJECT EVIDENCE').first()).toBeVisible();

    // Taxonomy Map
    await expect(page.getByText('CAPABILITY TAXONOMY MAP')).toBeVisible();
    await expect(page.getByRole('button', { name: 'AI / Machine Learning' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Backend Engineering' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Data & Databases' })).toBeVisible();
  });

  // 3. Skill Detail Drawer & Evidence Timeline
  test('Clicking a skill record opens capability detail drawer with evidence timeline', async ({ page }) => {
    await page.goto('/skills');

    // Find and click Python skill card
    await page.getByText('Python', { exact: true }).first().click();

    // Drawer opens
    await expect(page.getByText('CAPABILITY_RECORD')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Python' }).first()).toBeVisible();
    await expect(page.getByText('AUTHENTICATED EVIDENCE TIMELINE')).toBeVisible();
    await expect(page.getByText('AfterQuery & RotorDyn Applications')).toBeVisible();

    // Close drawer
    await page.locator('div.fixed button').first().click({ force: true });
  });

  // 4. Add Custom Skill Workflow
  test('Candidate can add a new custom skill with evidence state', async ({ page }) => {
    await page.goto('/skills');

    // Click Add Skill Record button
    await page.getByRole('button', { name: 'Add Skill Record' }).click();

    // Fill form
    await page.locator('input[placeholder="e.g. PyTorch, FastAPI, Docker"]').fill('GraphQL');
    await page.locator('form select').first().selectOption('Backend Engineering');
    await page.locator('input[placeholder="e.g. JobAI Candidate Platform V2"]').fill('GraphQL API Integration');
    await page.locator('textarea').fill('Implemented GraphQL query engine and resolvers.');

    // Save
    await page.getByRole('button', { name: 'Save Skill Record' }).click({ force: true });

    // Verify GraphQL appears in skill records
    await expect(page.getByText('GraphQL', { exact: true }).first()).toBeVisible({ timeout: 10000 });
  });

  // 5. Radial Navigation to /skills from /dashboard and /resume
  test('RadialNavMenu navigates to /skills from other spatial routes', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('#radial-hub-toggle').click();

    // Click Skill Passport sector
    await page.locator('#radial-sector-skills').click();
    await page.waitForURL('**/skills');
    expect(page.url()).toContain('/skills');

    // Verify /skills loaded correctly
    await expect(page.getByRole('heading', { name: 'Digital Skill Passport' })).toBeVisible();
  });
});
