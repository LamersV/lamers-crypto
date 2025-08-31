# @lamersv/crypto

Biblioteca TypeScript para **criptografia simétrica** no Node.js com API simples para `encrypt`, `decrypt`, `compare` e `isEncrypted`. A configuração é lida de variáveis de ambiente e validada em tempo de execução. O formato de saída é **`<iv_base64>:<cipher_base64>`** (IV e payload em Base64), usando por padrão `aes-256-ctr` com IV de 16 bytes e chave derivada via SHA‑256.

## Instalação

Publicado no GitHub Packages sob o escopo `@lamersv`. Configure a autenticação do registro no `.npmrc` do projeto:

```
@lamersv:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Depois, instale com seu gerenciador preferido:

```
npm install @lamersv/crypto
```

```
yarn add @lamersv/crypto
```

```
pnpm add @lamersv/crypto
```

## Configuração (.env)

As funções usam por padrão a configuração do módulo `src/config` (carregada com `dotenv`). Defina as variáveis no ambiente ou em um arquivo `.env`:

```
ENCRYPT_ALGORITHM=aes-256-ctr
ENCRYPT_IV_LENGTH=16
ENCRYPT_SECRET_KEY=uma-chave-secreta-bem-aleatoria
```

- **ENCRYPT_ALGORITHM**: algoritmo aceito pelo Node `crypto` (padrão: `aes-256-ctr`).  
- **ENCRYPT_IV_LENGTH**: tamanho do IV em bytes (padrão: `16`).  
- **ENCRYPT_SECRET_KEY**: segredo usado para derivar a chave (é **hasheado com SHA-256** para obter 32 bytes).

A validade da configuração é checada; em caso de ausência/valor inválido, é lançada `ConfigError` com mensagem descritiva.

## Uso básico

```ts
import { encrypt, decrypt, compare, isEncrypted } from '@lamersv/crypto';

// criptografar
const token = encrypt('olá mundo');            // => "IV_BASE64:CIPHER_BASE64"

// verificar formato
isEncrypted(token);                            // true

// descriptografar
const plain = decrypt(token);                  // "olá mundo"

// comparar (valor em claro vs valor criptografado)
compare('olá mundo', token);                   // true
compare('outro valor', token);                 // false
```

## Config customizada (sem .env)

Todas as funções aceitam um segundo/terceiro parâmetro de configuração (`ConfigCryptoValidate`):

```ts
import { encrypt, decrypt, compare, isEncrypted } from '@lamersv/crypto';

const conf = {
  algorithm: 'aes-256-ctr',
  ivLength: 16,
  secretKey: 'minha-chave-secreta',
};

const cipher = encrypt('segredo', conf);
const back  = decrypt(cipher, conf);
const ok    = compare('segredo', cipher, conf);
const chk   = isEncrypted(cipher, conf);
```

## Tratamento de erros

As operações lançam exceções especializadas do pacote `@lamersv/error`:

- `EncryptError` – falha ao criptografar (valor nulo, etc.)  
- `DecryptError` – falha ao descriptografar (formato inválido, não criptografado, etc.)  
- `CompareError` – dados inválidos para comparação  
- `ConfigError` – configuração ausente ou inválida

```ts
import { encrypt } from '@lamersv/crypto';

try {
  const out = encrypt('');
} 
catch (err) {
  // err.code pode ser "ENCRYPT_ERROR", "DECRYPT_ERROR", "COMPARE_ERROR" ou "CONFIG_ERROR"
  console.error(err);
}
```

## Detalhes de implementação

- **Formato**: `"IV_BASE64:CIPHER_BASE64"`.  
- **IV**: gerado com `crypto.randomBytes(ivLength)`.  
- **Chave**: `SHA-256(secretKey)` → 32 bytes.  
- **Cipher/Decipher**: `crypto.createCipheriv` / `crypto.createDecipheriv` com algoritmo configurado.  
- **isEncrypted**: valida estrutura, base64 e **tamanho exato do IV**.

## API

### Funções
- `encrypt(value: string, conf?: ConfigCryptoValidate): string`
- `decrypt(value: string, conf?: ConfigCryptoValidate): string`
- `compare(value: string, encrypted: string, conf?: ConfigCryptoValidate): boolean`
- `isEncrypted(value: string, conf?: ConfigCryptoValidate): boolean`

### Tipos
```ts
export interface ConfigCrypto {
  algorithm: string;
  ivLength: number;
  secretKey: string;
  validate(conf: ConfigCryptoValidate): void;
}

export type ConfigCryptoValidate = Omit<ConfigCrypto, 'validate'>;
```

## Mapa de exports

O pacote expõe apenas a entrada principal:

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
