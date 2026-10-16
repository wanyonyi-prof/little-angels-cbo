/**
 * Simple honeypot spam protection
 * Add a hidden field to forms — if it's filled, it's a bot
 */
export const createHoneypot = () => ({
  honeypot: '',
});

/**
 * Check if submission is spam
 */
export const isSpam = (formData) => {
  // If honeypot field is filled, it's a bot
  if (formData.honeypot && formData.honeypot.trim() !== '') {
    return true;
  }
  return false;
};

/**
 * Rate limiting using localStorage
 * Prevents the same browser from submitting too many times per hour
 * DISABLED in development for easier testing
 */
export const checkRateLimit = (maxPerHour = 5) => {
  // Skip rate limit entirely during development (npm run dev)
  if (import.meta.env.DEV) {
    return { allowed: true };
  }

  const key = 'la_cbo_submission_times';
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    const recent = stored.filter((time) => time > oneHourAgo);

    if (recent.length >= maxPerHour) {
      return {
        allowed: false,
        message: 'Too many submissions. Please try again later.',
      };
    }

    recent.push(now);
    localStorage.setItem(key, JSON.stringify(recent));
    return { allowed: true };
  } catch (e) {
    // If localStorage fails, allow the submission
    return { allowed: true };
  }
};