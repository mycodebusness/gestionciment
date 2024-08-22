import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { DetailCommande, Produit } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows: details } =
    await sql<DetailCommande>`SELECT * FROM detailcommmade WHERE idcom=${idCl};`;
  const {
    driver_Id,
    driver_name,
    idcom,
    iddetcom,
    idprod,
    item_id,
    quantity,
    remaining_qty,
    uom,
    etat,
    prix_unitaire,
    remark,
    total,
    vehicule_number,
  } = details[0];
  const { rows } = await sql<Produit>`SELECT idprod, itemname FROM produit `;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un commande détail
      </h2>
      <Formulaire
        driver_Id={driver_Id}
        driver_name={driver_name}
        etat={etat}
        idcom={idcom}
        iddetcom={iddetcom}
        idprod={idprod}
        item_id={item_id}
        prix_unitaire={prix_unitaire}
        produits={rows}
        quantity={quantity}
        remaining_qty={remaining_qty}
        remark={remark}
        uom={uom}
        vehicule_number={vehicule_number}
      />
    </div>
  );
}

export default Page;
