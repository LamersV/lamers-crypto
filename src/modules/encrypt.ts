import { ConfigCryptoValidate } from "../config/types";
import { EncryptError } from "../utils/exceptions";
import { validateConfig } from "../config/utils";
import { isEncrypted } from "./is-encrypted";
import config from "../config";
import crypto from "crypto";

export const encrypt = (value: string, conf: ConfigCryptoValidate = config): string => {
  validateConfig(conf);

  if (!value) throw new EncryptError('Erro ao criptografar valor nulo');
  if (isEncrypted(value)) return value;

  const SECRET_KEY = crypto.createHash('sha256').update(conf.secretKey).digest();

  const iv = crypto.randomBytes(conf.ivLength);
  const cipher = crypto.createCipheriv(conf.algorithm, SECRET_KEY, iv);
  let encrypted = cipher.update(value, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return `${iv.toString('base64')}:${encrypted}`;
};