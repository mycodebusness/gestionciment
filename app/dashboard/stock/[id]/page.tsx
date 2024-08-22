import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Produit, Stock } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } = await sql<Stock>`SELECT * from stock where idstock=${idCl}`;
  const { date, idprod, idstock, quantity, date_expiration, emplacement } =
    rows[0];
    const { rows :produits} = await sql<Produit
    >`SELECT idprod, itemname FROM produit `;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un stock
      </h2>
      <Formulaire
        date_expiration={date_expiration}
        emplacement={emplacement}
        idprod={idprod}
        idstock={idstock}
        quantity={quantity}
         peoduits={produits}
      />
    </div>
  );
}

export default Page;
