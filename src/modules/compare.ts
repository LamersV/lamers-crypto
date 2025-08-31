import { ConfigCryptoValidate } from "../config/types";
import { CompareError } from "../utils/exceptions";
import { decrypt } from "./decrypt";
import config from "../config";

export const compare = (value: string, encrypted: string, conf: ConfigCryptoValidate = config): boolean => {
  if (!value || !encrypted) throw new CompareError('Erro ao comparar valores nulos');
  return decrypt(encrypted, conf) === value;
};