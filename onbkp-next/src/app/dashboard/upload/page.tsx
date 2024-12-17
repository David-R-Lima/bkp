"use client"
import { useState } from "react";

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

export default function UploadComponent() {
    const [uploadOptions, setUploadOptions] = useState("")

    return (
        <div className="space-y-4">
                        <Card>
                <CardHeader>
                    <CardTitle>Upload config</CardTitle>
                    <CardDescription>Mude as configurações de upload de arquivo ao realizar um backup.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                <Select onValueChange={(e) => {
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
                </CardContent>
                <CardFooter>
                          <div>
                            <Button>Salvar</Button>
                          </div>
                </CardFooter>
            </Card>
        </div>
    );
}