#!/usr/bin/env node
// This script runs before the build on Render.
// If DATABASE_URL is a PostgreSQL URL, it patches the Prisma schema to use postgresql provider.

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const dbUrl = process.env.DATABASE_URL || '';

if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  console.log('🔧 Detected PostgreSQL DATABASE_URL — patching prisma/schema.prisma...');
  let schema = fs.readFileSync(schemaPath, 'utf8');
  schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, schema);
  console.log('✅ Prisma schema patched to postgresql');
} else {
  console.log('ℹ️  Using SQLite (local dev mode)');
}
