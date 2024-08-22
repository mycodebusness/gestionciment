"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addCommande, upDateCommande } from "@/lib/actions";

const FormSchema = z.object({
  inco_term: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  transport_mode: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  delivery_point: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  requeste_date: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  expiry_date: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  payement_type: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  currency: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  vat_rate: z.coerce.number({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  activites: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  status: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  origine: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  date_creation: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  date_livraison: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  adresse_livraison: z.coerce.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  idcl: z.coerce.number({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({
  idcomm = 0,
  inco_term = "",
  transport_mode = "",
  delivery_point = "",
  requeste_date = new Date().toDateString(),
  expiry_date = new Date().toDateString(),
  payement_type = "",
  currency = "",
  vat_rate = 0,
  activites = "",
  status = "",
  origine = "",
  date_creation = new Date().toDateString(),
  date_livraison = new Date().toDateString(),
  adresse_livraison = "",
  idcl = 0,

  client = [
    {
      idcl: 0,
      nomcomplet: "aucun nom",
    },
  ],
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inco_term,
      transport_mode,
      delivery_point,
      requeste_date,
      expiry_date,
      payement_type,
      currency,
      vat_rate,
      activites,
      status,
      origine,
      date_creation,
      date_livraison,
      adresse_livraison,
      idcl,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (idcomm == 0) {
      try {
        await addCommande(data);
        toast({
          title: "Ajouter",
          description: `la commande ${idcomm}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du commande`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateCommande(idcomm, data);
        toast({
          title: "Modifier",
          description: `la commande ${idcomm}  a été modifier avec succès`,
          className: "bg-blue-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur modifier",
          description: `Erreur lors de la modification`,
          className: "bg-red-700 text-white",
        });
      }
    }
    handleHidden();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="inco_term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>inco_term</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transport_mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>transport_mode</FormLabel>
              <FormControl>
                <Input placeholder="transport_mode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="delivery_point"
          render={({ field }) => (
            <FormItem>
              <FormLabel>delivery_point</FormLabel>
              <FormControl>
                <Input placeholder="delivery_point" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requeste_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>requeste_date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="requeste_date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiry_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>expiry_date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="expiry_date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payement_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>payement_type</FormLabel>
              <FormControl>
                <Input placeholder="payement_type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>currency</FormLabel>
              <FormControl>
                <Input placeholder="currency" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vat_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>vat_rate</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activites"
          render={({ field }) => (
            <FormItem>
              <FormLabel>activites</FormLabel>
              <FormControl>
                <Input placeholder="activites" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <FormControl>
                <Input placeholder="status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="origine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>origine</FormLabel>
              <FormControl>
                <Input placeholder="origine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_creation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>date_creation</FormLabel>
              <FormControl>
                <Input type="date" placeholder="date_creation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_livraison"
          render={({ field }) => (
            <FormItem>
              <FormLabel>date_livraison</FormLabel>
              <FormControl>
                <Input type="date" placeholder="date_livraison" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adresse_livraison"
          render={({ field }) => (
            <FormItem>
              <FormLabel>adresse_livraison</FormLabel>
              <FormControl>
                <Input placeholder="adresse_livraison" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idcl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner client" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {client.map((pres, index) => (
                    <SelectItem key={index} value={pres.idcl?.toString()}>
                      {pres.nomcomplet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={hidden} aria-disabled={hidden}>
          soumettre
        </Button>
      </form>
    </Form>
  );
}
