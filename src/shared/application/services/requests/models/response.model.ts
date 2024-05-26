import { ErrorData } from "../../../../../system/exceptions";


export type DataResponse<D> = {
  status: "success" | "error";
  data: D | null;
  errors: ErrorData[] | null;
};

export type Process<T> = () => Promise<T | null>;

export interface ResponseService {
  processRequest<D>(process: Process<D>): Promise<DataResponse<D>>;
}
