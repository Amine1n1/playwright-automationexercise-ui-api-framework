import 'dotenv/config';

export const validUser = {
  username: process.env.VALID_USERNAME || '',
  password: process.env.VALID_PASSWORD || '',
};
