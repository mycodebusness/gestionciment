import React from "react";
import { sql } from "@vercel/postgres";
import { Commande } from "@/lib/types";
// import { categories as rows } from "@/lib/data";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";
import { cookies } from "next/headers";
import { Users, verifyToken } from "@/lib/verification";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: Users | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
    if (verificationcookie?.role) {
      if (verificationcookie?.role != "Client") {
        redirect("/dashboard");
      }
    } else {
      redirect("/login");
    }
  }

  const { rows } = await sql<Commande>`SELECT 
    c.idcomm,
    c.inco_term,
    c.transport_mode,
    c.delivery_point,
    c.requeste_date,
    c.expiry_date,
    c.payement_type,
    c.currency,
    c.vat_rate,
    c.activites,
    c.status,
    c.origine,
    c.date_creation,
    c.date_livraison,
    c.adresse_livraison,
    c.idcl,
    CONCAT(cl.nom, ' ', cl.prenom) AS nomcomplet
FROM 
    commande c
JOIN 
    client cl ON c.idcl = cl.idcl

WHERE c.idcl=${verificationcookie?.id}
`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Commande
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
