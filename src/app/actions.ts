"use server";

import { db } from "@/db";
import { organizations, users, userOrg } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getOrganizations() {
    return await db.select().from(organizations);
}

export async function getOrganizationWithUsers(id: number) {
    try {
        const orgFromDB = await db
            .select({
                organizationId: organizations.id,
                organizationName: organizations.name,
                userId: users.id,
                userFullName: users.fullName,
                role: userOrg.roles,
            })
            .from(organizations)
            .leftJoin(userOrg, eq(organizations.id, userOrg.organizationId))
            .leftJoin(users, eq(users.id, userOrg.userId))
            .where(eq(organizations.id, id));

        if (!orgFromDB[0]) {
            notFound();
        }

        const organization = {
            id: id,
            name: orgFromDB[0]?.organizationName ?? null,
            users: orgFromDB
                .filter((row) => row.userId !== null)
                .map((row) => ({
                    id: row.userId!,
                    fullName: row.userFullName!,
                    role: row.role!,
                })),
        };

        return organization;
    } catch (error) {
        console.error("Failed to fetch organization with users:", error);
        throw error;
    }
}
