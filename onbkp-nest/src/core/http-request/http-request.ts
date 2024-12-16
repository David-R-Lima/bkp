export interface HttpRequestProps {
  url: string
  token?: string
  isBearer?: boolean
  headers: Record<string, string>
}

export abstract class HttpRequest<T> {
  abstract configuration({ url, headers, isBearer, token }: HttpRequestProps): T
}
