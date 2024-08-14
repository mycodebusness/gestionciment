import React from "react";
import { sql } from "@vercel/postgres";
import { Produit } from "@/lib/types";
// import { categories as rows } from "@/lib/data";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const { rows } = await sql<Produit>`SELECT * from produit`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Produit
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
