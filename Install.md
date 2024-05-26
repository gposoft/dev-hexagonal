# Instalación del Entorno

- Instalación de librería inicial

```bash
    npm init -y

    npm install ts-node-dev --save-dev

    npm install -D typescript

    npx tsc --init

```

- Modifica el archivo tsconfig.json

```bash

{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "ES2021",
    "lib": [
      "ES2021"
    ],
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "outDir": "./build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "noUnusedLocals": false, // indica que la variables locales nunca se usan
    "noUnusedParameters": false, // indica que los parametros nunca se usan
    "strictPropertyInitialization": false // para que no me obligue a que las propiedades estén inicializadas
  },
  "exclude": [
    "node_modules",
    "vitest.config.ts"
  ]
}

```

- Proporciona los comandos para ejecutar el proyecto se modifica el archivo package.json:

```bash

  "scripts": {
    "dev": "cls && ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "start": "node build/index.js",
    "test": "vitest"
  },

```

- Instalación de paquetes

```bash
  npm i express
  npm i cors
  npm i body-parser
  npm i dotenv
  npm i cross-env
  npm i pg
  npm i crypto-js
  npm i jsonwebtoken
  npm i zod
  npm i date-fns

  npm i @apollo/server graphql
  npm i graphql-tag
  npm i @graphql-tools/schema
  npm i @apollo/subgraph

  npm i compression
  npm i cookie-parser
  npm i bcryptjs
  npm i nodemailer
  npm i winston
  npm i pino
  npm i pino-pretty
  npm i express-rate-limit
  npm i @types/pg @types/cors @types/express @types/node @types/crypto-js @types/jsonwebtoken @types/compression @types/cookie-parser @types/bcryptjs @types/nodemailer -D
  npm i class-validator

  npm i tsyringe reflect-metadata

```

- Instalación de paquete para hacer Test

```bash
  npm install -D vitest


  "scripts": {
    ...
    test:"vitest"
  },
```
