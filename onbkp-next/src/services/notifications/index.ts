import { api } from "../api";
import { Notifications } from "./types";



interface CreateNotificationRequest {
    email: string;
    event: string;
}

export function createNotification(data: CreateNotificationRequest) {
    return api.post('/notifications', data);
}

export async function listNotifications() {
    const { data } = await api.get<{notifications: Notifications[]}>('/notifications');
    return data
}

export async function deleteNotification(id_notification: string) {
    await api.delete('/notifications/' + id_notification);
}