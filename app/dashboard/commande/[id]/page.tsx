import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Commande, Produit, Stock } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Commande>`SELECT * from commande where idcomm=${idCl}`;
  const {
    currency,
    delivery_point,
    expiry_date,
    idcl,
    idcomm,
    inco_term,
    payement_type,
    requeste_date,
    status,
    transport_mode,
    vat_rate,
    activites,
    adresse_livraison,
    date_creation,
    date_livraison,
    nomcomplet,
    origine,
  } = rows[0];
  const { rows: client } = await sql<{
    idcl: number;
    nomcomplet: string;
  }>`SELECT 
  cl.idcl,
  CONCAT(cl.nom, ' ', cl.prenom) AS nomcomplet
FROM 
  client cl;
`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un stock
      </h2>
      <Formulaire
        activites={activites}
        adresse_livraison={adresse_livraison}
        client={client}
        currency={currency}
        date_creation={date_creation}
        date_livraison={date_livraison}
        delivery_point={delivery_point}
        expiry_date={expiry_date}
        idcl={idcl}
        idcomm={idcomm}
        inco_term={inco_term}
        origine={origine}
        payement_type={payement_type}
        requeste_date={requeste_date}
        status={status}
        transport_mode={transport_mode}
        vat_rate={vat_rate}
      />
    </div>
  );
}

export default Page;
