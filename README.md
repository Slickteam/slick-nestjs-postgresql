# @slickteam/nestjs-pg-typeorm

[![npm version](https://img.shields.io/npm/v/@slickteam/nestjs-pg-typeorm.svg)](https://www.npmjs.com/package/@slickteam/nestjs-pg-typeorm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A NestJS module that provides pre-configured PostgreSQL database integration using TypeORM.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Exports](#exports)
- [Migration Commands](#migration-commands)
- [Dependencies](#dependencies)
- [License](#license)

## Prerequisites

- Node.js >= 18
- NestJS >= 11
- PostgreSQL database

## Installation

```bash
npm install @slickteam/nestjs-pg-typeorm
```

Or with pnpm:

```bash
pnpm add @slickteam/nestjs-pg-typeorm
```

## Configuration

Add the following environment variables to your `.env` file:

```bash
# Required
POSTGRESQL_ADDON_HOST=localhost
POSTGRESQL_ADDON_PORT=5432
POSTGRESQL_ADDON_USER=user
POSTGRESQL_ADDON_PASSWORD=password
POSTGRESQL_ADDON_DB=db_name
POSTGRESQL_MAX_POOL_SIZE=25

# Optional
POSTGRESQL_SYNCHRONIZE=false          # Auto-sync schema (disable in production)
POSTGRESQL_LOGGER=                    # Logger type: advanced-console | simple-console | file | debug
POSTGRESQL_LOGGING=false              # Enable SQL query logging
POSTGRESQL_ENTITY_PATH=dist/**/*.entity.js,dist/**/*Entity.js
POSTGRESQL_MIGRATION_PATH=dist/migration/*.js
```

### Environment Variables Reference

| Variable                    | Required | Default                                 | Description                      |
| --------------------------- | -------- | --------------------------------------- | -------------------------------- |
| `POSTGRESQL_ADDON_HOST`     | Yes      | -                                       | Database host                    |
| `POSTGRESQL_ADDON_PORT`     | Yes      | -                                       | Database port                    |
| `POSTGRESQL_ADDON_USER`     | Yes      | -                                       | Database user                    |
| `POSTGRESQL_ADDON_PASSWORD` | Yes      | -                                       | Database password                |
| `POSTGRESQL_ADDON_DB`       | Yes      | -                                       | Database name                    |
| `POSTGRESQL_MAX_POOL_SIZE`  | Yes      | -                                       | Connection pool size             |
| `POSTGRESQL_SYNCHRONIZE`    | No       | `false`                                 | Auto-synchronize database schema |
| `POSTGRESQL_LOGGER`         | No       | -                                       | TypeORM logger type              |
| `POSTGRESQL_LOGGING`        | No       | `false`                                 | Enable query logging             |
| `POSTGRESQL_ENTITY_PATH`    | No       | `dist/**/*entity.js,dist/**/*Entity.js` | Glob patterns for entity files   |
| `POSTGRESQL_MIGRATION_PATH` | No       | `dist/migration/*.js`                   | Glob pattern for migration files |

## Usage

Import the `DatabaseModule` in your application module:

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@slickteam/nestjs-pg-typeorm';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
```

### Using with Entities

Register your entities using `TypeOrmModule.forFeature()`:

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule, TypeOrmModule } from '@slickteam/nestjs-pg-typeorm';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModule {}
```

### Injecting Repositories

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@slickteam/nestjs-pg-typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
```

## Exports

This module re-exports all TypeORM exports and provides the following:

| Export                      | Description                              |
| --------------------------- | ---------------------------------------- |
| `DatabaseModule`            | Pre-configured TypeORM module            |
| `TypeOrmModule`             | NestJS TypeORM module for entity binding |
| `TypeOrmModuleAsyncOptions` | Async configuration options type         |
| `TypeOrmModuleOptions`      | Configuration options type               |
| `TypeOrmOptionsFactory`     | Options factory interface                |
| `InjectDataSource`          | Decorator to inject DataSource           |
| `InjectEntityManager`       | Decorator to inject EntityManager        |
| `InjectRepository`          | Decorator to inject Repository           |

All TypeORM exports (Entity, Column, Repository, etc.) are also available directly from this package.

## Migration Commands

This package provides the `slick-migration` CLI for managing database migrations.

### Using with npx

```bash
npx slick-migration <command> [options]
```

### Using with package.json scripts

```json
{
  "scripts": {
    "migration:create": "slick-migration create",
    "migration:generate": "slick-migration generate",
    "migration:run": "slick-migration run",
    "migration:revert": "slick-migration revert",
    "migration:show": "slick-migration show",
    "migration:drop": "slick-migration drop"
  }
}
```

### Commands Reference

| Command    | Description                              | Example                                            |
| ---------- | ---------------------------------------- | -------------------------------------------------- |
| `create`   | Create a new empty migration file        | `slick-migration create src/migrations/CreateUser` |
| `generate` | Generate a migration from schema changes | `slick-migration generate src/migrations/AddEmail` |
| `run`      | Run pending migrations                   | `slick-migration run`                              |
| `revert`   | Revert the last executed migration       | `slick-migration revert`                           |
| `show`     | Show all migrations and their status     | `slick-migration show`                             |
| `drop`     | Drop the database schema                 | `slick-migration drop`                             |

### Help

```bash
npx slick-migration --help
```

## Dependencies

| Package           | Version  |
| ----------------- | -------- |
| `@nestjs/common`  | ^11.1.12 |
| `@nestjs/config`  | ^4.0.2   |
| `@nestjs/typeorm` | ^11.0.0  |
| `typeorm`         | 0.3.28   |
| `pg`              | ^8.18.0  |

## License

[MIT](LICENSE) - Slickteam
