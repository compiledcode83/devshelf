import crypto from 'crypto';

export const generateCrypto = () => {
  return crypto.randomBytes(16).toString('hex');
};
