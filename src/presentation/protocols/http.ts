/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse{
  statusCode: number
  body: any
}

export interface HttpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
}
