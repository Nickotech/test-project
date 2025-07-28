"use server";

import { db } from "@/db";
import { organizations } from "@/db/schema";

export async function getOrganizations() {
    const orgs = await db.select().from(organizations);
    return orgs;
}
