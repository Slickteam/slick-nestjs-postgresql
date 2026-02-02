#!/usr/bin/env node

import { execSync } from 'child_process';
import { resolve } from 'path';

const args = process.argv.slice(2);
const command = args[0];
const restArgs = args.slice(1).join(' ');

const dataSourcePath = resolve(__dirname, 'database-config.js');

const commands: Record<string, string> = {
  create: `typeorm-ts-node-commonjs migration:create ${restArgs}`,
  generate: `typeorm-ts-node-commonjs migration:generate -d ${dataSourcePath} ${restArgs}`,
  run: `typeorm-ts-node-commonjs migration:run -d ${dataSourcePath} ${restArgs}`,
  revert: `typeorm-ts-node-commonjs migration:revert -d ${dataSourcePath} ${restArgs}`,
  show: `typeorm-ts-node-commonjs migration:show -d ${dataSourcePath} ${restArgs}`,
  drop: `typeorm-ts-node-commonjs schema:drop -d ${dataSourcePath} ${restArgs}`,
};

function printHelp(): void {
  console.log(`
slick-migration - TypeORM migration CLI for @slickteam/nestjs-pg-typeorm

Usage: slick-migration <command> [options]

Commands:
  create <path>    Create a new empty migration file
  generate <path>  Generate a migration from schema changes
  run              Run pending migrations
  revert           Revert the last executed migration
  show             Show all migrations and their status
  drop             Drop the database schema

Examples:
  slick-migration create src/migrations/CreateUserTable
  slick-migration generate src/migrations/AddEmailColumn
  slick-migration run
  slick-migration revert
  slick-migration show
`);
}

if (!command || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (!commands[command]) {
  console.error(`Unknown command: ${command}\n`);
  printHelp();
  process.exit(1);
}

try {
  execSync(commands[command], { stdio: 'inherit' });
} catch {
  process.exit(1);
}
