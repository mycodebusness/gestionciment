"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addProduit, upDateProduit } from "@/lib/actions";
import { useState } from "react";

const FormSchema = z.object({
  itemname: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  type: z.string().min(2, {
    message: "le type doit contenir aumoins 2 caractères.",
  }),
  date_creation: z.string().min(2, {
    message: "la date doit être valide",
  }),
  description: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  quantity: z.coerce.number({
    message: "la quantité doit doit être valide",
  }),
  stockalerte: z.coerce.number({
    message: "le stock doit doit être valide",
  }),
  prix: z.coerce.number({
    message: "le prix doit doit être valide",
  }),
});

export function Formulaire({
  idprod = 0,
  itemname = "",
  type = "",
  quantity = 0,
  stockalerte = 0,
  prix = 0,
  description = "",
  date_creation = new Date().toDateString(),
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemname,
      type,
      quantity,
      stockalerte,
      prix,
      description,
      date_creation,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (idprod == 0) {
      try {
        await addProduit(data);
        toast({
          title: "Ajouter",
          description: `le produit ${data.itemname}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du produit`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateProduit(idprod, data);
        toast({
          title: "Modifier",
          description: `le produit ${data.itemname}  a été modifier avec succès`,
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
          name="itemname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input placeholder="nom produit..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="decrivez votre produit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de produit</FormLabel>
              <FormControl>
                <Input
                  placeholder="decrivez votre type de produit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix du produit</FormLabel>
              <FormControl>
                <Input
                  placeholder="entrez le prix du produit"
                  type="number"
                  {...field}
                />
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
              <FormLabel>Quantité en stock</FormLabel>
              <FormControl>
                <Input
                  placeholder="entrez la quantité en stock"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stockalerte"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock alert</FormLabel>
              <FormControl>
                <Input
                  placeholder="entrez le stock d'alert"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_creation"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Quantité en stock</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
