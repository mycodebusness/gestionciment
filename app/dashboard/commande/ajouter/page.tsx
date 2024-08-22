import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows } = await sql<{ idcl: number; nomcomplet: string }>`SELECT 
    cl.idcl,
    CONCAT(cl.nom, ' ', cl.prenom) AS nomcomplet
FROM 
    client cl;
 `;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un stock
      </h2>
      <Formulaire client={rows} />
    </div>
  );
}

export default Page;
