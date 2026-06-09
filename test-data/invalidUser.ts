import 'dotenv/config';

export const invalidUser = {
  username: process.env.INVALID_USERNAME || '',
  password: process.env.INVALID_PASSWORD || '',
};