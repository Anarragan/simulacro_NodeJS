import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'test' 
? path.resolve(process.cwd(), '../../.env.test') 
: path.resolve(process.cwd(), '../../.env');

dotenv.config({ path: envFile });
console.log(`Using environment file: ${envFile}`);