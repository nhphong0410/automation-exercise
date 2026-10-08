import type { Page } from '@playwright/test';

export function trackLoginSubmissions(page: Page): string[] {
  const submissions: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (request.method() === 'POST' && /\/(login|verifyLogin)$/i.test(url.pathname)) {
      submissions.push(request.url());
    }
  });
  return submissions;
}