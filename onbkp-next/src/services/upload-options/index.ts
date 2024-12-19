import { api } from "../api";
import { UploadOptions, UploadType } from "./types";

interface CreateRequest {
    uploadType: UploadType
}

export async function createUploadOptions(data: CreateRequest){
    const res = await api.post('/upload-options', data);

    return res.data;
}

export async function getUploadOptions(){
    const res = await api.get<{uploadOptions: UploadOptions}>(`/upload-options`);

    return res.data
}