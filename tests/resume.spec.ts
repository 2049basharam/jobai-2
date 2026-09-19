import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('JobAI Candidate Platform — Phase 5 Resume Upload & Document Ingestion', () => {
  test('Resume route renders workspace header, dropzone, and spatial radial navigator', async ({ page }) => {
    await page.goto('/resume');

    // Header & Title
    await expect(page.getByRole('heading', { name: 'RESUME_UPLOAD_AND_DOCUMENT_INGESTION' })).toBeVisible();
    await expect(page.getByText('AUTHORITATIVE_DATA_ISOLATED')).toBeVisible();

    // Dropzone & Format Badges
    await expect(page.getByText('DRAG_AND_DROP_RESUME_SOURCE_DOCUMENT')).toBeVisible();
    await expect(page.getByText('PDF (.pdf)')).toBeVisible();
    await expect(page.getByText('Word (.docx)')).toBeVisible();
    await expect(page.getByText('Text (.txt)')).toBeVisible();
    await expect(page.getByText('MAX 5MB')).toBeVisible();

    // Radial Application Navigator on /resume
    const hubToggle = page.locator('#radial-hub-toggle');
    await expect(hubToggle).toBeVisible();
    await expect(hubToggle).toContainText('RESUME');
  });

  test('Document history table displays active primary resume and file metadata', async ({ page }) => {
    await page.goto('/resume');

    await expect(page.getByText('RESUME_DOCUMENT_HISTORY')).toBeVisible();
    await expect(page.getByText('alex_morgan_senior_engineer_resume.pdf')).toBeVisible();
    await expect(page.getByText('PRIMARY')).toBeVisible();
    await expect(page.getByText('[EXTRACTED]')).toBeVisible();
  });

  test('Parsed artifact preview inspector renders structured JSON and raw text tabs', async ({ page }) => {
    await page.goto('/resume');

    await expect(page.getByText('PARSED_RESUME_ARTIFACT_INSPECTOR')).toBeVisible();
    await expect(page.getByText('CANDIDATE_CONTACT_IDENTIFIERS')).toBeVisible();
    await expect(page.getByText('Alex Morgan')).toBeVisible();
    await expect(page.getByText('EXTRACTED_TECHNICAL_SKILLS')).toBeVisible();

    // Switch to Raw Text Stream Tab
    await page.getByRole('button', { name: 'Raw Text Stream' }).click({ force: true });
    await expect(page.getByText('// RAW_EXTRACTED_TEXT_STREAM')).toBeVisible();

    // Switch back to Structured JSON Tab
    await page.getByRole('button', { name: 'Structured JSON' }).click({ force: true });
    await expect(page.getByText('CANDIDATE_CONTACT_IDENTIFIERS')).toBeVisible();
  });

  test('Apply to Profile modal protects authoritative profile data with explicit opt-in review', async ({ page }) => {
    await page.goto('/resume');

    // Click Apply to Profile button
    const applyBtn = page.locator('#apply-to-profile-btn');
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    // Modal opens
    await expect(page.getByText('AUTHORITATIVE_PROFILE_DIFF_REVIEW')).toBeVisible();
    await expect(page.getByText('FULL NAME', { exact: true })).toBeVisible();
    await expect(page.getByText('WORK EXPERIENCE')).toBeVisible();

    // Click Commit Selected Fields to Profile
    const confirmBtn = page.locator('#confirm-apply-profile-btn');
    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();

    await expect(page.getByText('Authoritative profile records updated successfully!')).toBeVisible();
  });

  test('RadialNavMenu navigates cleanly between /dashboard, /profile, and /resume', async ({ page }) => {
    await page.goto('/resume');
    await page.locator('#radial-hub-toggle').click();

    // Navigate to /dashboard
    await page.locator('#radial-sector-dashboard').click();
    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');

    // Navigate to /profile from dashboard
    await page.locator('#radial-hub-toggle').click();
    await page.locator('#radial-sector-identity').click();
    await page.waitForURL('**/profile');
    expect(page.url()).toContain('/profile');
  });
});
