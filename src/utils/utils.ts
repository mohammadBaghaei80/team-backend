const randomstring = require('randomstring');
import * as bcrypt from 'bcrypt';

export const generateRandomString = (length: number) => {
  return randomstring.generate({
    length: length,
    charset: 'alphabetic',
  });
};

export const generateHashedString = (rawText) => {
  return bcrypt.hashSync(rawText, 15);
};
