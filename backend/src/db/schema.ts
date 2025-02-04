
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";


export const todoTable = pgTable("todos",{
    id : integer().primaryKey().generatedAlwaysAsIdentity(),
    title : varchar({length : 255}).notNull(),
    description : varchar({length : 1000}).notNull(),
    completed : integer().notNull().default(0),
})