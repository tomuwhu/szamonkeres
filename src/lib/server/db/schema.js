import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
    id: text().primaryKey(),
    name: text(),
    username: text().notNull().unique(),
    passwordHash: text('password_hash').notNull()
})

export const session = sqliteTable("session", {
    id: text().primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
})

export const tools = sqliteTable("tools", {
    id: integer('id').primaryKey(),
    title: text().notNull(),
    description: text().notNull(),
    image: text().notNull(),
    serialnum: text().notNull(),
    user_id: text().notNull().references(() => user.id),
})