import { UseInterceptors } from "@nestjs/common";
import { AxiosErrorInterceptor } from "../interceptors/axios-error.interceptor";

export const UseAxiosErrorInterceptor = () => UseInterceptors(AxiosErrorInterceptor);