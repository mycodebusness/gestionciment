"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Plus,
  Pen,
  Delete,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DetailCommande as Payment } from "@/lib/types";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast } from "@/components/ui/use-toast";
import { deleteCommande, deleteDetailCommande } from "@/lib/actions";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "idcomm",
    header: "Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.iddetcom}</div>
    ),
  },
  {
    accessorKey: "etat",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Etat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.etat}</div>,
  },
  {
    accessorKey: "driver_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chauffeur
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.driver_name}</div>
    ),
  },
  {
    accessorKey: "prix_unitaire",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.prix_unitaire}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Qte",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.quantity}</div>
    ),
  },
  {
    accessorKey: "remark",
    header: "Remarque",
    cell: ({ row }) => <div className="capitalize">{row.original.remark}</div>,
  },
  {
    accessorKey: "remaining_qty",
    header: "remaining_qty",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.remaining_qty}</div>
    ),
  },

  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex gap-3"
                  href={`/dashboard/detailcommande/ajouter`}
                >
                  <Plus className="h-7 w-7 rounded-full text-white bg-green-800 hover:bg-green-600 p-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 justify-center items-center">
                <Plus className="h-6 w-6 rounded-full" />
                <p>Ajouter une nouvelle commande</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex gap-3"
                  href={`/dashboard/detailcommande/${row.original.iddetcom}`}
                >
                  <Pen className="h-7 w-7 rounded-full text-white bg-blue-800 hover:bg-blue-600  p-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 justify-center items-center">
                <Pen className="h-6 w-6 rounded-full" />
                <p>modifier la commande N°{row.original.iddetcom}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Delete className="h-7 w-7 rounded-full text-white bg-red-800 hover:bg-red-600 p-2 cursor-pointer" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="flex gap-2 justify-center items-center">
                  <Delete className="h-6 w-6 rounded-full" />
                  <p>supprimer la commande de {row.original.idcom}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DialogContent>
              <DialogHeader>
                <DialogTitle> Suppression commande</DialogTitle>
                <DialogDescription>
                  Etes-vous sur de supprimer le commande de {row.original.idcom}{" "}
                  définitivement?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fermer
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      await deleteDetailCommande(row.original.iddetcom);
                      toast({
                        title: "Supprimer",
                        description: `le detail commande de ${row.original.iddetcom} a été supprimer avec succès`,
                        className: "bg-green-700 text-white",
                      });
                    } catch (error) {
                      toast({
                        title: "Erreur supprimer",
                        description: `Erreur lors de la suppression de la categorie`,
                        className: "bg-red-700 text-white",
                      });
                    }
                  }}
                >
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function DataTable({ data }: { data: Payment[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(6);
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="w-full px-4 pt-4">
      <div className="flex items-center pb-4">
        <Input
          placeholder="Rechercher Id commande..."
          value={(table.getColumn("idcomm")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("idcomm")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total : {table.getFilteredRowModel().rows.length} commande(s)
          détail(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setPageIndex((prevPageIndex) => prevPageIndex - 1);
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setPageIndex((prevPageIndex) => prevPageIndex + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
