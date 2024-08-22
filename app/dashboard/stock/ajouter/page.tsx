import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";
import { Produit } from "@/lib/types";

async function Page() {
  const { rows } = await sql<Produit>`SELECT idprod, itemname FROM produit `;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un stock
      </h2>
      <Formulaire peoduits={rows} />
    </div>
  );
}

export default Page;
