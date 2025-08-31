declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENCRYPT_SECRET_KEY: string;
      ENCRYPT_IV_LENGTH: string;
      ENCRYPT_ALGORITHM: string;
    }
  }
}

export { }