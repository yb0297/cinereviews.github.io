import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { pgTable, uuid, integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Database schema matching the Supabase migrations
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  user_id: uuid('user_id').notNull(),
  movie_id: integer('movie_id').notNull(),
  movie_title: text('movie_title').notNull(),
  rating: integer('rating').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  pros: text('pros').array().default(sql`'{}'::text[]`),
  cons: text('cons').array().default(sql`'{}'::text[]`),
  recommendation: varchar('recommendation').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  email: text('email'),
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  username: text('username'),
  bio: text('bio').default(''),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Database connection
const connectionString = import.meta.env.DATABASE_URL;

let db: any = null;

if (connectionString) {
  const pool = new Pool({ connectionString });
  db = drizzle(pool, { schema: { reviews, profiles } });
}

export { db };