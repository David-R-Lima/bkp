"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { NotificationEvents } from "./events"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createNotification, listNotifications } from "@/services/notifications"
import { toast } from "sonner"
import dayjs from "dayjs"

export function Aviso() {
    const eventsRef = useRef(null);
    const [email, setEmail] = useState<string | undefined>()

    const createNotificationMutation = useMutation({
        mutationKey: ['create-notification'],
        mutationFn: createNotification,
        onSuccess: () => {
            toast.success("Notificação criada com sucesso!")
            notifications.refetch()
        }
    })

    function getSelectedEvents() {
        if (eventsRef.current) {
            //@ts-expect-error askdjalsdkj 
            const selectedEvents = eventsRef.current.getElements();
            return selectedEvents
          }
    }

    const notifications = useQuery({
        queryKey: ['notifications'],
        queryFn: listNotifications
    })

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Avisos</CardTitle>
                    <CardDescription>Receba notificações em tempo real no seu e-mail sobre os backups dos seus bancos.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-3">
                        <Label>E-mail</Label>
                        <Input placeholder="Ex: lorem@ipsum.com" type="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }}></Input>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Label>Eventos</Label>
                        <NotificationEvents ref={eventsRef}></NotificationEvents>
                    </div>
                </CardContent>
                <CardFooter>
                    <div>
                        <Button onClick={() => {
                            const events = getSelectedEvents()

                            if(!events || events?.length === 0) {
                                toast.error("Select atleast one event")
                                return
                            }

                            if(!email || email?.length === 0 || email === "") {
                                toast.error("Please input your email")
                                return
                            }

                             createNotificationMutation.mutate({
                                email,
                                event: events[0].value,
                            })
                        }}>Salvar</Button>
                    </div>
                </CardFooter>
            </Card>
            <div className="my-8">
                <hr />
            </div>
            <div className="space-y-2">
                <h2>Notificações salvas</h2>
                {notifications.data && notifications.data.notifications.map((notification) => (
                    <div key={notification.id_notification} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <div>
                            <p className="text-sm">Email: {notification.email}</p>
                            <p className="text-sm">Tipo de eventos: {notification.type}</p>
                            <div className="flex space-x-2 mt-2">
                                <Button>Editar</Button>
                                <Button>Ver logs</Button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">            
                            <p className="text-sm text-gray-500">{dayjs(notification.created_at).format("DD/MM/YYYY HH:mm:ss")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}