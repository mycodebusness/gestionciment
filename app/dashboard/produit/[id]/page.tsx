import React from "react";
import { sql } from "@vercel/postgres";
import { Produit } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Produit>`SELECT * from produit where idprod=${idCl}`;
  const {
    idprod,
    itemname,
    prix,
    quantity,
    stockalerte,
    type,
    description,
    date_creation,
  } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un produit
      </h2>
      <Formulaire
        idprod={idprod}
        itemname={itemname}
        prix={prix}
        date_creation={date_creation}
        quantity={quantity}
        stockalerte={stockalerte}
        type={type}
        description={description}
      />
    </div>
  );
}

export default Page;
