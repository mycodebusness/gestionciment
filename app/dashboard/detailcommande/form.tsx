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
import { addDetailCommande, upDateDetailCommande } from "@/lib/actions";

const FormSchema = z.object({
  item_id: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  quantity: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  remaining_qty: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  uom: z.coerce.string({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  driver_Id: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  driver_name: z.coerce.string({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  vehicule_number: z.coerce.string({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  remark: z.coerce.string({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  idprod: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  idcom: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  prix_unitaire: z.coerce.number({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
  etat: z.coerce.string({
    message: "ce champ doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({
  iddetcom = 0,
  item_id = 0,
  quantity = 0,
  remaining_qty = 0,
  uom = "",
  driver_Id = 0,
  driver_name = "",
  vehicule_number = "",
  remark = "",
  idprod = 0,
  idcom = 0,
  prix_unitaire = 0,
  etat = "",

  produits = [
    {
      idprod: 0,
      itemname: "aucun nom",
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
      item_id,
      quantity,
      remaining_qty,
      uom,
      driver_Id,
      driver_name,
      vehicule_number,
      remark,
      idprod,
      idcom,
      prix_unitaire,
      etat,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (iddetcom == 0) {
      try {
        await addDetailCommande(data);
        toast({
          title: "Ajouter",
          description: `la commande ${iddetcom}  a été ajouter avec succès`,
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
        await upDateDetailCommande(iddetcom, data);
        toast({
          title: "Modifier",
          description: `la commande ${iddetcom}  a été modifier avec succès`,
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
          name="idprod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produits</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {produits.map((pres, index) => (
                    <SelectItem key={index} value={pres.idprod?.toString()}>
                      {pres.itemname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driver_Id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>driver_Id</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driver_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>driver_name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="etat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>etat</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idcom"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>idcom</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="item_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>item_id</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prix_unitaire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>prix_unitaire</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remaining_qty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>remaining_qty</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>remark</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>uom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicule_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>vehicule_number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
