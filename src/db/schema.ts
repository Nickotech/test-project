import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
});

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
});

export const userOrg = pgTable("user_org", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    organizationId: integer("organization_id")
        .notNull()
        .references(() => organizations.id),
    roles: text("roles").notNull().default("Regular"),
});

export const schema = {
    users,
    organizations,
    userOrg,
};
