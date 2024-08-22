import React from "react";
import { sql } from "@vercel/postgres";
import { DetailCommande } from "@/lib/types";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;
  const { rows } =
    await sql<DetailCommande>`SELECT * FROM detailcommmade WHERE idcom=${idCl};`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Détail commande
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
