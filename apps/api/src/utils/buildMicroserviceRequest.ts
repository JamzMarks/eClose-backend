import { MicroserviceRequest, DataMicroserviceRequest } from "@app/common/contracts/messages/microservice-request.interface";


export function buildMicroserviceRequest<T>(user: any, data?: T): MicroserviceRequest | DataMicroserviceRequest<T>{
    if(data){
        return {
            user: {
                id: user?.sub ?? 'anonymous',
                roles: user?.roles ?? 'guest',
                permissions: user?.permissions ?? [],
            },
            data,
        }
    }
    return {
        user: {
            id: user?.sub ?? 'anonymous',
            roles: user?.roles ?? 'guest',
            permissions: user?.permissions ?? [],
        },
    }
    
}