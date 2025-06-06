export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
  meta?: any;
}

export class ResponseHandler {
  static success<T>(data: T, meta?: any): ApiResponse<T> {
    return { success: true, data, meta };
  }

  static error(message: string, errors?: any): ApiResponse<null> {
    return { success: false, message, errors };
  }
}