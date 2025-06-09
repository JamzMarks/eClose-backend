export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error'
} 
  

export interface ApiResponse<T = any> {
  status: ApiStatus;
  data?: T | null;
  message?: string;
  errors?: any;
}

  export interface ErrorReturn {
    return: "error";
    message?: string;
    code?: string | number;
  }

  export interface SuccessReturn<T> {
    return: "success";
    count_total?: number;
    count_items?: number;
    data: T;
  }