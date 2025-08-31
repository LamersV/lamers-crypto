import { CustomErrorProperties } from "@lamersv/error/types";
import { ExceptionError } from "@lamersv/error";

export class EncryptError extends ExceptionError {
  constructor(message?: string, properties?: CustomErrorProperties) {
    super(message || "Erro ao criptografar valor", {
      code: "NCRYPT_ERROR",
      ...properties
    });
  }
}

export class DecryptError extends ExceptionError {
  constructor(message?: string, properties?: CustomErrorProperties) {
    super(message || "Erro ao descriptografar valor", {
      code: "DECRYPT_ERROR",
      ...properties
    });
  }
}

export class CompareError extends ExceptionError {
  constructor(message?: string, properties?: CustomErrorProperties) {
    super(message || "Erro ao comparar valores criptografados", {
      code: "COMPARE_ERROR",
      ...properties
    });
  }
}

export class ConfigError extends ExceptionError {
  constructor(message?: string, properties?: CustomErrorProperties) {
    super(message || "Erro na configuração de criptografia", {
      code: "CONFIG_ERROR",
      ...properties
    });
  }
}