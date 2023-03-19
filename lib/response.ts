export type Response<T> = {
  message: string;
  success: boolean;
  value?: T;
  errors?: string[];
};
