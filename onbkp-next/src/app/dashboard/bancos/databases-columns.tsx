'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Database } from '@/services/database/types'
import Link from 'next/link'

export const DatabaseColumns = (): ColumnDef<Database>[] => {
  const columns: ColumnDef<Database>[] = [
    {
      accessorKey: 'database_description',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'database_type',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tipo do banco
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'routines',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Número de rotinas
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'retentions',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='text-primary'
          >
            Número de retenções
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const database = row.original
        return (
          <Button variant={'link'} asChild>
            <Link href={"/dashboard/bancos/" + database.id_database}>Gerenciar</Link>
          </Button>
        )
      },
    },
  ]

  return columns
}