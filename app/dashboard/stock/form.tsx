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
import { useState } from "react";
import { addStock, upDateStock } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  emplacement: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  date_expiration: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  quantity: z.coerce.number({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  idprod: z.coerce.number({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({
  idstock = 0,
  quantity = 0,
  idprod = 0,
  emplacement = "",
  date_expiration = new Date().toDateString(),
  peoduits = [
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
      quantity,
      idprod,
      emplacement,
      date_expiration,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (idstock == 0) {
      try {
        await addStock(data);
        toast({
          title: "Ajouter",
          description: `le stock ${idstock}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du stock`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateStock(idstock, data);
        toast({
          title: "Modifier",
          description: `le stock ${idstock}  a été modifier avec succès`,
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
          name="date_expiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Expiration</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input placeholder="Quantité" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idprod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programmes</FormLabel>
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
                  {peoduits.map((pres, index) => (
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
          name="emplacement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emplacement</FormLabel>
              <FormControl>
                <Input placeholder="Emplacement" {...field} />
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
