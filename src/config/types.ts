export type ConfigCryptoValidate = Omit<ConfigCrypto, 'validate'>;

export interface ConfigCrypto {
  algorithm: string;
  ivLength: number;
  secretKey: string;

  validate(conf: ConfigCryptoValidate): void;
}