import { validateConfig } from "./utils";
import { ConfigCrypto } from "./types";
import dotenv from 'dotenv';

dotenv.config();

const config: ConfigCrypto = {
  algorithm: process.env.ENCRYPT_ALGORITHM || 'aes-256-ctr',
  ivLength: Number(process.env.ENCRYPT_IV_LENGTH || 16),
  secretKey: process.env.ENCRYPT_SECRET_KEY,

  validate: validateConfig
}

export default config;