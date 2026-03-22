/**
 * Global Hooks & Configuration
 * 
 * Setup and teardown logic for test suite
 */

import { test, expect } from '@playwright/test';

/**
 * Global test hook - runs before all tests
 */
test.describe.configure({ mode: 'parallel' });

/**
 * Custom expect matchers (if needed)
 */
expect.extend({
  // Add custom matchers here if needed
});

// Global error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
