import { ConfigCryptoValidate } from "../config/types";
import { DecryptError } from "../utils/exceptions";
import { validateConfig } from "../config/utils";
import { isEncrypted } from "./is-encrypted";
import config from "../config";
import crypto from "crypto";

export const decrypt = (value: string, conf: ConfigCryptoValidate = config): string => {
  validateConfig(conf);

  if (!value) throw new DecryptError('Erro ao descriptografar valor nulo');
  if (!isEncrypted(value)) throw new DecryptError('Valor não criptografado');

  const [ivBase64, encryptedData] = value.split(':');
  if (!ivBase64 || !encryptedData) throw new DecryptError('Formato de criptografia inválido');

  const SECRET_KEY = crypto.createHash('sha256').update(conf.secretKey).digest();

  const iv = Buffer.from(ivBase64, 'base64');
  const decipher = crypto.createDecipheriv(conf.algorithm, SECRET_KEY, iv);
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
