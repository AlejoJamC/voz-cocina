/**
 * Time utility functions for delays and durations
 */

export const delays = {
  short: 100,
  medium: 500,
  long: 1000,
  extraLong: 2000,
} as const;

export const durations = {
  fast: 150,
  normal: 300,
  slow: 600,
  extraSlow: 1000,
} as const;

/**
 * Creates a promise that resolves after the specified delay
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Creates a mock audio level generator
 * Returns a random value between 0 and 1, biased towards a range
 */
export const generateMockAudioLevel = (): number => {
  // Generate a value between 0.3 and 0.9 for more realistic variation
  return 0.3 + Math.random() * 0.6;
};

