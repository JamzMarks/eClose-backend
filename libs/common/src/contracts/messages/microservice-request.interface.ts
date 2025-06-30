export interface MicroserviceRequest {
    user: {
        id: string,
        roles: string,
        permissions: string[]
    }
}

export interface DataMicroserviceRequest<T = any> extends MicroserviceRequest{
    data: T 
}


