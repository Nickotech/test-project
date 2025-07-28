"use client";

import { getOrganizations } from "./actions";
import { useEffect, useState, useTransition } from "react";

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
            <h1>Organizations:</h1> {organizations && organizations.map((org) => <p key={org.id}>{org.name}</p>)}
        </div>
    );
}
