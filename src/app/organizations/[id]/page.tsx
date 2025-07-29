"use client";

import { getOrganizationWithUsers } from "@/app/actions";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type User = {
    id: number;
    fullName: string;
    role: string;
};

type Organization = {
    id: number;
    name: string;
    users: User[];
};

export default function OrganizationPage() {
    const { id } = useParams<{ id: string }>();

    const [organization, setOrganization] = useState<Organization | null>();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const org = await getOrganizationWithUsers(parseInt(id));
            setOrganization(org);
        });
    }, []);

    return (
        <div className="flex flex-col gap-5 ml-10">
            <p>{isPending && "LOADING..."}</p>
            {organization && (
                <div>
                    <h1 className="text-2xl font-bold mb-5">{organization.name}</h1>
                    <ol className="list-decimal">
                        <span className="font-bold underline">Users:</span>
                        {organization.users.length &&
                            organization.users.map((user: User) => (
                                <li key={user.id}>
                                    {user.fullName} - {user.role}
                                </li>
                            ))}
                    </ol>
                </div>
            )}
        </div>
    );
}
