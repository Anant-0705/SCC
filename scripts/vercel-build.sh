#!/bin/bash

# Vercel build script
echo "Setting up database for production build..."

# Generate Prisma client
npx prisma generate

# Push database schema (this will create tables if they don't exist)
if [ "$VERCEL_ENV" = "production" ]; then
  echo "Running production database setup..."
  npx prisma db push --skip-generate
else
  echo "Running preview database setup..."
  npx prisma db push --skip-generate
fi

echo "Database setup complete!"