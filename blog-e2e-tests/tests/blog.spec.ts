import { test, expect, describe, beforeEach } from '@playwright/test';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('form')).toHaveText(/login/i);
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[name="username"]', 'mluukkai');
      await page.fill('input[name="password"]', 'salainen');
      await page.click('button[type="submit"]');
      await expect(page.locator('.notification')).toHaveText(/welcome/i);
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('input[name="username"]', 'mluukkai');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      await expect(page.locator('.error')).toHaveText(/invalid/i);
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.fill('input[name="username"]', 'mluukkai');
      await page.fill('input[name="password"]', 'salainen');
      await page.click('button[type="submit"]');
    });

    test('a new blog can be created', async ({ page }) => {
      await page.click('button.new-blog');
      await page.fill('input[name="title"]', 'Test Blog');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');
      await page.click('button.save-blog');
      await expect(page.locator('.blog')).toHaveText(/test blog/i);
    });

    test('a blog can be liked', async ({ page }) => {
      await page.click('button.new-blog');
      await page.fill('input[name="title"]', 'Test Blog');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');
      await page.click('button.save-blog');

      await page.click('button.like');
      await expect(page.locator('.likes')).toHaveText('1');
    });

    test('a blog can be deleted by its creator', async ({ page }) => {
      await page.click('button.new-blog');
      await page.fill('input[name="title"]', 'Test Blog');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');
      await page.click('button.save-blog');

      await page.click('button.delete');
      await expect(page.locator('.blog')).not.toBeVisible();
    });

    test('only the creator sees the delete button', async ({ page }) => {
      await page.click('button.new-blog');
      await page.fill('input[name="title"]', 'Test Blog');
      await page.fill('input[name="author"]', 'Test Author');
      await page.fill('input[name="url"]', 'http://testblog.com');
      await page.click('button.save-blog');

      await page.click('button.logout');
      await page.goto('/');

      await expect(page.locator('button.delete')).not.toBeVisible();
    });

    test('blogs are ordered by likes', async ({ page }) => {
      await page.click('button.new-blog');
      await page.fill('input[name="title"]', 'Blog 1');
      await page.fill('input[name="author"]', 'Author 1');
      await page.fill('input[name="url"]', 'http://blog1.com');
      await page.click('button.save-blog');

      await page.click('button.new-blog');
      await page.fill('input[name="title"]', 'Blog 2');
      await page.fill('input[name="author"]', 'Author 2');
      await page.fill('input[name="url"]', 'http://blog2.com');
      await page.click('button.save-blog');

      await page.locator('.blog:has-text("Blog 2") button.like').click();
      await page.locator('.blog:has-text("Blog 2") button.like').click();

      const blogs = await page.locator('.blog').allTextContents();
      expect(blogs[0]).toContain('Blog 2');
      expect(blogs[1]).toContain('Blog 1');
    });
  });
});