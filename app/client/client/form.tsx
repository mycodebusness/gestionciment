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
import { addClient, upDateClient } from "@/lib/actions";

const FormSchema = z.object({
  nom: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  prenom: z.string().min(2, {
    message: "le prenom doit contenir aumoins 2 caractères.",
  }),
  avenue: z.string().min(2, {
    message: "l'avenu doit contenir aumoins 2 caractères.",
  }),
  numero: z.string({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  quartier: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  commune: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  ville: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  numeroimpot: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  rccmm: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  telephone: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  email: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),

  type_client: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  password: z.string().min(2, {
    message: "la description doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({
  idcl = 0,
  nom = "",
  prenom = "",
  avenue = "",
  numero = "",
  quartier = "",
  commune = "",
  ville = "",
  numeroimpot = "",
  rccmm = "",
  telephone = "",
  email = "",
  type_client = "",
  password = "",
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom,
      prenom,
      avenue,
      numero,
      quartier,
      commune,
      ville,
      numeroimpot,
      rccmm,
      telephone,
      email,

      type_client,
      password,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (idcl == 0) {
      try {
        await addClient(data);
        toast({
          title: "Ajouter",
          description: `le client ${data.nom}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du client`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateClient(idcl, data);
        toast({
          title: "Modifier",
          description: `le client ${data.nom}  a été modifier avec succès`,
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
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du client</FormLabel>
              <FormControl>
                <Input placeholder="nom client..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prenom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="prénom client" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type_client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type client</FormLabel>
              <FormControl>
                <Input placeholder="Type client" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder="Mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rccmm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro RCCM</FormLabel>
              <FormControl>
                <Input placeholder="Numéro RCCM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numeroimpot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro Impôt</FormLabel>
              <FormControl>
                <Input placeholder="Numéro Impôt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Numéro téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro maison</FormLabel>
              <FormControl>
                <Input placeholder="Numéro maison" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avénue maison</FormLabel>
              <FormControl>
                <Input placeholder="Avénue maison" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quartier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quartier</FormLabel>
              <FormControl>
                <Input placeholder="Quartier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ville"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commune"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commune</FormLabel>
              <FormControl>
                <Input placeholder="commune" {...field} />
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
