import { ConfigCryptoValidate } from "../config/types";
import { validateConfig } from "../config/utils";
import config from "../config";

export const isEncrypted = (value: string, conf: ConfigCryptoValidate = config): boolean => {
  validateConfig(conf);

  if (!value) return false;

  const parts = value.split(':');
  if (parts.length !== 2) return false;

  const [ivBase64, encryptedData] = parts;

  try {
    const iv = Buffer.from(ivBase64, 'base64');
    if (iv.length !== conf.ivLength) return false;

    Buffer.from(encryptedData, 'base64');
    return true;
  }
  catch (err) {
    return false;
  }
}