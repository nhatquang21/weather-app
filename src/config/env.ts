/**
 * Environment configuration utility
 * Safely loads and validates environment variables
 */

interface Config {
  apiKey: string;
  cryptoKey: string; // Key for encryption/decryption
  isDevelopment: boolean;
  isProduction: boolean;
}

function getEnvVar(key: string): string {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

export const config: Config = {
  apiKey: getEnvVar('VITE_API_KEY'),
  cryptoKey: getEnvVar('VITE_CRYPTO_KEY'),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate API key format (basic check)
if (config.apiKey === 'your_api_key_here') {
  throw new Error('Please set a valid API key in your .env file');
}

if (config.apiKey.length < 10) {
  console.warn('API key seems too short, please verify it is correct');
}
