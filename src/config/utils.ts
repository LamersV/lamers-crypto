import { ConfigCryptoValidate } from "./types";
import { ConfigError } from "@lamersv/error";

export const validateConfig = (config: ConfigCryptoValidate) => {
  if (!config.algorithm) throw new ConfigError('Algoritmo de criptografia não foi definido, verifique a variável de ambiente ENCRYPT_ALGORITHM');
  if (!config.ivLength) throw new ConfigError('Tamanho do vetor de inicialização não foi definido, verifique a variável de ambiente ENCRYPT_IV_LENGTH');
  if (!config.secretKey) throw new ConfigError('Chave secreta não foi definida, verifique a variável de ambiente ENCRYPT_SECRET_KEY');
}