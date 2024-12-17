import { api } from "../api";
import { UploadType } from "./types";

interface CreateRequest {
    uploadType: UploadType
}

export async function createUploadOptions(data: CreateRequest){
    const res = await api.post('/upload-options', data);

    return res.data;
}