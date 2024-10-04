# Slick Nestjs Postresql Typeorm

## Usage

- Install dependency

```bash
npm i -S @slickteam/nestjs-pg-typeorm
```

- In your environment file, add these lines :

```conf
POSTGRESQL_ADDON_HOST=localhost
POSTGRESQL_ADDON_PORT=5432
POSTGRESQL_ADDON_USER=user
POSTGRESQL_ADDON_PASSWORD=password
POSTGRESQL_ADDON_DB=db_name
POSTGRESQL_MAX_POOL_SIZE=25
# Optionnel
POSTGRESQL_SYNCHRONIZE=false
POSTGRESQL_LOGGER=
POSTGRESQL_ENTITY_PATH=dist/**/*.entity.js,dist/**/**/*.entity.js
POSTGRESQL_MIGRATION_PATH=dist/migration/*.js
```

- In module where you want use this module, add this :

```ts
@Module({
  imports: [Warp10Module],
  controllers: [],
  providers: [],
  exports: [],
})
class ExempleModule {}
```

## Commands for package.json

```json
{
  "scripts": {
    "migration:drop": "typeorm-ts-node-commonjs schema:drop -d ./node_modules/@slickteam/nestjs-pg-typeorm/dist/database-config.js",
    "migration:show": "typeorm-ts-node-commonjs migration:show -d ./node_modules/@slickteam/nestjs-pg-typeorm/dist/database-config.js",
    "migration:create": "typeorm-ts-node-commonjs migration:create",
    "migration:run": "typeorm-ts-node-commonjs migration:run -d ./node_modules/@slickteam/nestjs-pg-typeorm/dist/database-config.js",
    "migration:revert": "typeorm-ts-node-commonjs migration:revert -d ./node_modules/@slickteam/nestjs-pg-typeorm/dist/database-config.js"
  }
}
```

## Dependencies version

Nestjs

- `@nestjs/common`: `^10.4.4`
- `@nestjs/config`: `^3.2.3`

Pg

- `pg`: `^8.13.0`

Typeorm

- `@nestjs/typeorm`: `^10.0.2`
- `typeorm`: `^0.3.20`
