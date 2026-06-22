import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Tabela de leads capturados pelas landing pages
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  produto: varchar("produto", { length: 32 }).notNull(), // "sc5" | "zmgrow"
  nome: varchar("nome", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 30 }).notNull(),
  cultura: varchar("cultura", { length: 100 }),
  hectares: varchar("hectares", { length: 50 }),
  problema: varchar("problema", { length: 255 }),
  googleSheetsSync: mysqlEnum("googleSheetsSync", ["pending", "synced", "error"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
