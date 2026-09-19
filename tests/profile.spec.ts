import { test, expect } from '@playwright/test';

test.describe('JobAI Candidate Platform - Phase 4 Professional Identity & Radial Navigation', () => {
  test.describe.configure({ mode: 'serial' });
  // 1. Profile Page Render & Identity Header Test
  test('Profile route renders candidate identity workspace, header, and readiness gauge', async ({ page }) => {
    await page.goto('/profile');

    // Header & Workspace Title
    await expect(page.getByRole('heading', { name: 'Professional Identity Workspace' })).toBeVisible();
    await expect(page.getByText('AUTHORITATIVE_PROFESSIONAL_IDENTITY')).toBeVisible();

    // Readiness Gauge Surface
    await expect(page.getByRole('heading', { name: 'PROFILE READINESS MATRIX' })).toBeVisible();
    await expect(page.getByText('PROGRESS_VECTOR')).toBeVisible();

    // Sections rendered with ID anchors
    await expect(page.getByRole('heading', { name: /\[01\] FOUNDATIONAL IDENTITY/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[02\] CAREER DIRECTION/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[03\] PROFESSIONAL SUMMARY/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[04\] WORK EXPERIENCE/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[05\] EDUCATION & ACADEMIC DEGREES/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[06\] PROJECTS & REPOSITORIES/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[07\] CERTIFICATIONS/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /\[08\] PROFESSIONAL LINKS/i })).toBeVisible();
  });

  // 2. Modular Spatial Radial Navigation Wheel Test
  test('RadialNavMenu renders toggle hub, 8 spatial sectors, and sector jumps', async ({ page }) => {
    await page.goto('/profile');

    // Radial Toggle Button
    const hubBtn = page.locator('#radial-hub-toggle');
    await expect(hubBtn).toBeVisible();
    await hubBtn.click(); // Expand radial wheel

    // Verify expanded global sectors
    await expect(page.locator('#radial-sector-dashboard')).toBeVisible();
    await expect(page.locator('#radial-sector-identity')).toBeVisible();
    await expect(page.locator('#radial-sector-resume')).toBeVisible();

    // Verify contextual profile section jumps bar and click #experience jump
    await expect(page.getByText('PROFILE_CONTEXTUAL_SECTIONS')).toBeVisible();
    const expJumpBtn = page.locator('button:has-text("#experience")');
    await expect(expJumpBtn).toBeVisible();
    await expJumpBtn.click();
    await expect(page.locator('#experience')).toBeVisible();

    // Collapse hub back
    await hubBtn.click();
  });

  // 3. Identity Section Edit & Persistence Test
  test('Candidate can edit identity full name and persist updates', async ({ page }) => {
    await page.goto('/profile');

    const editIdentityBtn = page.locator('#edit-identity-btn');
    await expect(editIdentityBtn).toBeVisible();
    await editIdentityBtn.click();

    const nameInput = page.locator('#identity-fullName');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Dr. Alex Morgan');

    const saveIdentityBtn = page.locator('#save-identity-btn');
    await saveIdentityBtn.click();

    // Verify updated full name
    await expect(page.getByText('Dr. Alex Morgan').first()).toBeVisible();

    // Reload page & verify persistence
    await page.reload();
    await expect(page.getByText('Dr. Alex Morgan').first()).toBeVisible();
  });

  // 4. Career Direction Target Role Edit Test
  test('Candidate can set primary target role and career direction vector', async ({ page }) => {
    await page.goto('/profile');

    const editCareerBtn = page.locator('#edit-career-btn');
    await expect(editCareerBtn).toBeVisible();
    await editCareerBtn.click();

    const targetRoleInput = page.locator('#career-targetRole');
    await targetRoleInput.fill('Staff AI Systems Architect');

    const saveCareerBtn = page.locator('#save-career-btn');
    await saveCareerBtn.click({ force: true });

    await expect(page.getByText('Staff AI Systems Architect').first()).toBeVisible();
  });

  // 5. Work Experience CRUD Test
  test('Candidate can add, edit, and delete work experience items', async ({ page }) => {
    await page.goto('/profile');

    // Add Experience
    const addExpBtn = page.locator('#add-experience-btn');
    await expect(addExpBtn).toBeVisible();
    await addExpBtn.click();

    await page.locator('#exp-company').fill('DeepMind Technologies');
    await page.locator('#exp-position').fill('Principal AI Infrastructure Engineer');
    await page.locator('#exp-startDate').fill('Jan 2023');
    await page.locator('#exp-isCurrent').check();
    await page.locator('#exp-description').fill('Scaling multi-agent LLM systems.');

    await page.locator('#save-exp-btn').click();

    // Verify rendered
    await expect(page.getByText('Principal AI Infrastructure Engineer')).toBeVisible();
    await expect(page.getByText('DeepMind Technologies')).toBeVisible();
  });

  // 6. Education & Project CRUD Test
  test('Candidate can add education and project entries', async ({ page }) => {
    await page.goto('/profile');

    // Add Education
    const addEduBtn = page.locator('#add-education-btn');
    await expect(addEduBtn).toBeVisible();
    await addEduBtn.click();

    await page.locator('#edu-institution').fill('MIT Media Lab');
    await page.locator('#edu-degree').fill('Master of Science');
    await page.locator('#edu-fieldOfStudy').fill('Artificial Intelligence');
    await page.locator('#save-edu-btn').click();

    await expect(page.getByText('MIT Media Lab')).toBeVisible();
    await expect(page.getByText('Master of Science in Artificial Intelligence')).toBeVisible();

    // Add Project
    const addProjBtn = page.locator('#add-project-btn');
    await expect(addProjBtn).toBeVisible();
    await addProjBtn.click();

    await page.locator('#proj-title').fill('JobAI Candidate OS');
    await page.locator('#proj-tech').fill('React, Astro, Tailwind, TypeScript');
    await page.locator('#save-proj-btn').click();

    await expect(page.getByText('JobAI Candidate OS')).toBeVisible();
  });

  // 7. Zod URL Validation Test
  test('Link submission validates invalid URL formats', async ({ page }) => {
    await page.goto('/profile');

    const addLinkBtn = page.locator('#add-link-btn');
    await expect(addLinkBtn).toBeVisible();
    await addLinkBtn.click();

    await page.locator('#link-label').fill('Invalid Link Test');
    await page.locator('#link-url').fill('invalid-url-string');
    await page.locator('#save-link-btn').click();

    // Expect Zod validation error message
    await expect(page.getByText(/Please enter a valid URL/i).first()).toBeVisible();

    // Fill valid URL and save
    await page.locator('#link-url').fill('https://github.com/alexmorgan');
    await page.locator('#save-link-btn').click();

    await expect(page.getByText('Invalid Link Test')).toBeVisible();
  });

  // 8. Dashboard Integration Test
  test('Dashboard links to Professional Identity Workspace', async ({ page }) => {
    await page.goto('/dashboard');

    const editProfBtn = page.locator('#dashboard-edit-profile-btn');
    await expect(editProfBtn).toBeVisible({ timeout: 10000 });
    await editProfBtn.click();

    await expect(page).toHaveURL('/profile');
    await expect(page.getByRole('heading', { name: 'Professional Identity Workspace' })).toBeVisible({ timeout: 10000 });
  });
});
