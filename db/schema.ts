import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const summaries = sqliteTable("summaries", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  date: text("data").notNull(),
  duration: text("duration"), // can be null
  color: text("color").notNull(),
  summary: text("summary"), // store markdown as string
});
