"use client"

import { TableComponent } from "@/components/table";
import { DatabaseColumns } from "./databases-columns";
import { useQuery } from "@tanstack/react-query";
import { getDatabases } from "@/services/database";
import { useSession } from "next-auth/react";
import { CreateBancoForm } from "./create-database-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CustomersComponent() {
    const columns = DatabaseColumns()
    const session = useSession()

    const [page, setPage] = useState(0)

    const { data, isLoading} = useQuery({
        queryKey: ['databases-table', session.data?.user.id, page],
        queryFn: getDatabases,
        retry: 0,
    })

    const databases = data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <CreateBancoForm></CreateBancoForm>
            <TableComponent name={"Bancos"} columns={columns} data={databases} page={page} setPage={setPage}/>
        </div>
    );
}