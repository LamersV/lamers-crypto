
# @lamersv/crypto

TypeScript library for **symmetric encryption** in Node.js with a small, ergonomic API: `encrypt`, `decrypt`, `compare`, and `isEncrypted`. Configuration can be read from environment variables and is validated at runtime. The output format is **`<iv_base64>:<cipher_base64>`** (IV and payload in Base64). Default algorithm: `aes-256-ctr` with a 16‑byte IV and a 32‑byte key derived via SHA‑256 from your secret.

## Installation

Published on GitHub Packages under the `@lamersv` scope. Configure your project `.npmrc`:

```
@lamersv:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install with your preferred manager:

```
npm install @lamersv/crypto
```

```
yarn add @lamersv/crypto
```

```
pnpm add @lamersv/crypto
```

## Configuration (.env)

By default, functions use the module config `src/config` (loaded via `dotenv`). Set the following variables in your environment or in a `.env` file:

```
ENCRYPT_ALGORITHM=aes-256-ctr
ENCRYPT_IV_LENGTH=16
ENCRYPT_SECRET_KEY=your-strong-secret
```

- **ENCRYPT_ALGORITHM**: any algorithm supported by Node's `crypto` (default: `aes-256-ctr`).  
- **ENCRYPT_IV_LENGTH**: IV length in bytes (default: `16`).  
- **ENCRYPT_SECRET_KEY**: secret used to derive the encryption key (**hashed with SHA‑256** to 32 bytes).

If configuration is missing or invalid, a `ConfigError` is thrown with a descriptive message.

## Quick start

```ts
import { encrypt, decrypt, compare, isEncrypted } from '@lamersv/crypto';

// encrypt
const token = encrypt('hello world');         // => "IV_BASE64:CIPHER_BASE64"

// check format
isEncrypted(token);                           // true

// decrypt
const plain = decrypt(token);                 // "hello world"

// compare (plain value vs encrypted value)
compare('hello world', token);                // true
compare('something else', token);             // false
```

## Custom config (no .env)

All functions accept an optional configuration object (`ConfigCryptoValidate`):

```ts
import { encrypt, decrypt, compare, isEncrypted } from '@lamersv/crypto';

const conf = { algorithm: 'aes-256-ctr', ivLength: 16, secretKey: 'my-secret' };

const cipher = encrypt('secret', conf);
const back  = decrypt(cipher, conf);
const ok    = compare('secret', cipher, conf);
const chk   = isEncrypted(cipher, conf);
```

## Error handling

Operations throw specialized exceptions from `@lamersv/error`:

- `EncryptError` – encryption failed (e.g., null/empty value)  
- `DecryptError` – decryption failed (invalid format / not encrypted)  
- `CompareError` – invalid inputs for comparison  
- `ConfigError` – missing or invalid configuration

```ts
import {{ encrypt }} from '@lamersv/crypto';

try {
  const out = encrypt('');
}
catch (err) {
  // Possible err.code values: "NCRYPT_ERROR", "DECRYPT_ERROR", "COMPARE_ERROR", "CONFIG_ERROR"
  console.error(err);
}
```

## Implementation details

- **Format**: `"IV_BASE64:CIPHER_BASE64"`.  
- **IV**: generated with `crypto.randomBytes(ivLength)`.  
- **Key**: `SHA-256(secretKey)` → 32 bytes.  
- **Cipher/Decipher**: `crypto.createCipheriv` / `crypto.createDecipheriv` with the chosen algorithm.  
- **isEncrypted**: validates structure, base64, and **exact IV length**.

## API

### Functions
- `encrypt(value: string, conf?: ConfigCryptoValidate): string`
- `decrypt(value: string, conf?: ConfigCryptoValidate): string`
- `compare(value: string, encrypted: string, conf?: ConfigCryptoValidate): boolean`
- `isEncrypted(value: string, conf?: ConfigCryptoValidate): boolean`

### Types
```ts
export interface ConfigCrypto {
  algorithm: string;
  ivLength: number;
  secretKey: string;
  validate(conf: ConfigCryptoValidate): void;
}

export type ConfigCryptoValidate = Omit<ConfigCrypto, 'validate'>;
```

## Exports

The package exposes a single entry point that re‑exports the modules:

```ts
// src/index.ts
export * from './modules/is-encrypted';
export * from './modules/compare';
export * from './modules/decrypt';
export * from './modules/encrypt';
```

Package export map (build outputs in `dist/`):

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.js",
      "default": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./exceptions": {
      "import": "./dist/utils/exceptions.js",
      "require": "./dist/utils/exceptions.js",
      "default": "./dist/utils/exceptions.js",
      "types": "./dist/utils/exceptions.d.ts"
    }
  }
}
```

## Licença

MIT. Consulte o arquivo de licença no repositório oficial. [LICENSE](./LICENSE)
