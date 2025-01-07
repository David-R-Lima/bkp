'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreVertical } from 'lucide-react'
import { ExecutedRoutines } from '@/services/executed-routines/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import dayjs from 'dayjs'
import { downloadFile } from '@/services/executed-routines'
import fileDownload from 'js-file-download'

interface Props {
  databaseType: string
}

export const ExecutedRoutinesColumns = ({databaseType} : Props): ColumnDef<ExecutedRoutines>[] => {
  const columns: ColumnDef<ExecutedRoutines>[] = [
    {
      accessorKey: 'file_name',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome do arquivo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'file_size',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tamanho do arquivo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorFn: (executedRoutine: ExecutedRoutines) => {
        return executedRoutine.file_size + " Bytes"
      }
    },
    {
        accessorKey: 'start_backup',
        header: ({ column }) => {
          return (
            <Button
              variant="link"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Começo da rotina
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        accessorFn: (executedRoutine: ExecutedRoutines) => {
          if(executedRoutine.start_backup) {
            return dayjs(executedRoutine.start_backup).format("DD/MM/YYYY HH:mm:ss")
          }
        }
      },
      {
        accessorKey: 'end_send_cloud',
        header: ({ column }) => {
          return (
            <Button
              variant="link"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Fim da rotina
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        accessorFn: (executedRoutine: ExecutedRoutines) => {
          if(executedRoutine.end_send_cloud) {
            return dayjs(executedRoutine.end_send_cloud).format("DD/MM/YYYY HH:mm:ss")
          }
        }
      },
    {
      accessorKey: 'Ações',
      id: 'actions',
      cell: ( row ) => {
        const executedRoutine = row.row.original
        return (
          <Popover>
            <PopoverTrigger>
                <MoreVertical />
            </PopoverTrigger>
            <PopoverContent>
              <Button className='w-full' onClick={async () => {
                const file = await downloadFile(executedRoutine.id_routine, executedRoutine.id_executed_routine)

                switch (databaseType) {
                  case "MONGO":
                    fileDownload(file, executedRoutine.file_name + '.bson' + '.gz')
                    break
                  case "MYSQL":
                    fileDownload(file, executedRoutine.file_name + '.sql' + '.gz')
                    break
                  case "POSTGRES":
                    fileDownload(file, executedRoutine.file_name + '.sql' + '.gz')
                    break
                  default:
                    fileDownload(file, executedRoutine.file_name + '.gz')
                    break
                }
              }}>Baixar arquivo</Button>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  return columns
}