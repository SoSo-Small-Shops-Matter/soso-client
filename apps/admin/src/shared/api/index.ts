export interface GenericResponse<T> {
  message: string;
  status: number;
  result: T;
}