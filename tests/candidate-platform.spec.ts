import { test, expect } from '@playwright/test';

test.describe('JobAI Candidate Platform - Phase 2 Advanced Authentication', () => {
  // 1. Landing Page Baseline Test
  test('Landing Page renders hero, spatial intelligence core, and navigation', async ({ page }) => {
    await page.goto('/');

    // Check main title
    await expect(page.locator('h1')).toContainText('YOUR CAREER');
    await expect(page.locator('h1')).toContainText('INTELLIGENTLY EVOLVED');

    // Check Spatial Intelligence Core
    await expect(page.getByText('Spatial Intelligence Core')).toBeVisible();
    await expect(page.getByRole('button', { name: /Candidate Profile/i })).toBeVisible();

    // Check CTAs
    const exploreBtn = page.getByRole('link', { name: /Explore Opportunities/i }).first();
    await expect(exploreBtn).toBeVisible();
    await exploreBtn.click();
    await expect(page).toHaveURL('/register');
  });

  // 2. Login Page Test
  test('Login Page renders split composition, validates inputs, and toggles password visibility', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'WELCOME BACK' })).toBeVisible();
    await expect(page.getByText('Your career intelligence is ready.')).toBeVisible();

    // Check Google Auth button
    await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();

    // Fill invalid email & check JS validation
    await page.locator('input[name="email"]').fill('invalid-email');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();

    // Fill valid email & check password visibility toggle
    await page.locator('input[name="email"]').fill('candidate@jobai.io');
    await page.locator('input[name="password"]').fill('Secret123!');

    // Toggle password
    const toggleBtn = page.getByLabel('Show password text');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(page.locator('input[name="password"]')).toHaveAttribute('type', 'text');

    // Forgot password navigation
    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await expect(page).toHaveURL('/forgot-password');
  });

  // 3. Register Page Test (4-step Progressive Disclosure)
  test('Register Page navigates 4-step progressive disclosure wizard', async ({ page }) => {
    await page.goto('/register');

    await expect(page.getByText('01 / IDENTITY')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'BUILD YOUR PROFESSIONAL IDENTITY' })).toBeVisible();

    // Step 1 Validation
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page.getByText('Full name must be at least 2 characters')).toBeVisible();

    // Fill Step 1
    await page.locator('input[name="fullName"]').fill('Alex Morgan');
    await page.locator('input[name="email"]').fill('alex.morgan@test.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 2: Career Goal
    await expect(page.getByText('02 / DIRECTION')).toBeVisible();
    await expect(page.getByRole('button', { name: /Find a job/i })).toBeVisible();
    await page.getByRole('button', { name: /Find a job/i }).click();
    await expect(page.getByText('Target job search vector enabled')).toBeVisible();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 3: Career Stage
    await expect(page.getByText('03 / CAREER STAGE')).toBeVisible();
    const stageBtn = page.getByRole('button', { name: /Professional/i });
    await expect(stageBtn).toBeVisible();
    await stageBtn.click();
    await expect(page.getByText('Experienced professional profile set')).toBeVisible();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Step 4: Credentials & Progressive Checklist
    await expect(page.getByRole('heading', { name: 'SECURE YOUR ACCOUNT' })).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.getByText('8+ characters')).toBeVisible();

    // Fill password and check checklist active state
    await page.locator('input[name="password"]').fill('SecurePassword123!');
    await page.locator('input[name="confirmPassword"]').fill('SecurePassword123!');
    
    await page.locator('#submit-create-profile').click();

    // Check completion state
    await expect(page.getByRole('heading', { name: 'PROFILE INITIALIZED' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Continue to JobAI' })).toBeVisible();
  });

  // 4. Forgot Password Page Test
  test('Forgot Password Page handles email submission and security-safe message', async ({ page }) => {
    await page.goto('/forgot-password');

    await expect(page.getByRole('heading', { name: 'RESTORE ACCESS' })).toBeVisible();

    await page.locator('input[name="email"]').fill('candidate@jobai.io');
    await page.getByRole('button', { name: 'Send recovery link' }).click();

    await expect(page.getByText('If an account exists for this email, recovery instructions have been sent.')).toBeVisible();
    await page.getByRole('link', { name: 'Return to sign in' }).click();
    await expect(page).toHaveURL('/login');
  });
});
