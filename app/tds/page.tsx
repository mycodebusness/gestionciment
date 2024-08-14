import { ChartRound } from "@/components/chartRound";
import { ChartTimes } from "@/components/chartTimes";
import { ModeToggle } from "@/components/toggletheme";
import { Button } from "@/components/ui/button";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import React from "react";

async function Page() {
  const { rows: counts } = await sql`SELECT
        (SELECT COUNT(*) FROM clients) AS nombre_clients,
        (SELECT COUNT(*) FROM fournisseurs) AS nombre_fournisseurs,
        (SELECT COUNT(*) FROM produits) AS nombre_produits,
        (SELECT COUNT(*) FROM commandes) AS nombre_commandes`;

  // const { rows: revenueData } = await sql<{
  //   date: Date;
  //   revenu_total: number;
  // }>`SELECT
  //       DATE(date) AS date,
  //       SUM(montant) AS revenu_total
  //     FROM
  //         paiement
  //     GROUP BY
  //         DATE(date)
  //     ORDER BY
  //         DATE(date);`;

  // Convert the `revenueData` rows into a format expected by `ChartTimes`
  // const chartData = revenueData.map((row) => ({
  //   date: `${row.date?.getFullYear()}-${
  //     row.date?.getMonth() + 1
  //   }-${row.date?.getDate()}`,
  //   revenu_total: row.revenu_total,
  // }));

  return (
    <div className="flex flex-col">
      <main className="gap-4 p-4 lg:gap-6 lg:p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        <ChartRound
          nb={counts[0].nombre_clients}
          title="Total clients"
          label="clients"
        />
        <ChartRound
          nb={counts[0].nombre_fournisseurs}
          title="Total fournisseurs"
          label="fournisseurs"
        />
        <ChartRound
          nb={counts[0].nombre_commandes}
          title="Total commandes"
          label="commandes"
        />
        <ChartRound
          nb={counts[0].nombre_produits}
          title="Total produits"
          label="produits"
        />
      </main>
      <div className="flex justify-end w-full p-4">
        {/* <ChartTimes chartData={chartData} /> */}
        <Link href="/tds/plus">
          <Button>Voir plus +</Button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
