"use client";

import { getOrganizations } from "./actions";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

export default function Home() {
    const [organizations, setOrganizations] = useState<{ name: string; id: number }[]>();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const orgs = await getOrganizations();
            setOrganizations(orgs);
        });
    }, []);

    return (
        <div className="flex flex-col gap-5 ml-10">
            <p>{isPending && "LOADING..."}</p>
            <h1 className="text-2xl font-bold">Organizations:</h1>
            {organizations &&
                organizations.map((org) => (
                    <Link href={`/organizations/${org.id}`} key={org.id}>
                        {org.name}
                    </Link>
                ))}
        </div>
    );
}
