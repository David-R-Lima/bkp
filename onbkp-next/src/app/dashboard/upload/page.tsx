"use client"
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createUploadOptions, getUploadOptions } from "@/services/upload-options";
import { UploadType } from "@/services/upload-options/types";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function UploadComponent() {
    const [uploadType, setUploadOptions] = useState<UploadType | undefined>()

    const createUploadOptionsMutation = useMutation({
        mutationKey: ['create-upload-options'],
        mutationFn: createUploadOptions,
        onSuccess: () => {
            toast.success("Configurações do upload salvas com sucesso!")
        }
    })

    const uploadOptionsQuery = useQuery({
      queryKey: ['upload-options'],
      queryFn: getUploadOptions,
    })

    useEffect(() => {
      if(uploadOptionsQuery.data) {
        setUploadOptions(uploadOptionsQuery.data.uploadOptions.upload_type)
      }
    }, [uploadOptionsQuery.data])



    return (
        <div className="space-y-4">
          <Card>
            <CardHeader>
                <CardTitle>Upload config</CardTitle>
                <CardDescription>Mude as configurações de upload de arquivo ao realizar um backup.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row  items-center space-x-2">
              <Select value={uploadType} onValueChange={(e: UploadType) => {
                setUploadOptions(e)
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo do upload" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo do upload</SelectLabel>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="s3">S3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <HoverCard openDelay={0}>
                  <HoverCardTrigger asChild>
                    <Info size={18} className="hover:cursor-pointer"/>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div>
                      Para usar a opção s3, adicione as variável de ambiente ao iniciar o projeto.
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardContent>
            <CardFooter>
              <div>
                <Button onClick={() => {
                    if(!uploadType) {
                        toast.error("Selecione um tipo de upload")
                        return
                    }

                    createUploadOptionsMutation.mutate({ uploadType })
                }}>Salvar</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
    );
}