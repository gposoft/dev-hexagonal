
import { ErrorProcessor } from "../../../../../system/exceptions";
import { DataResponse, Process, ResponseService } from "../models/response.model";

export class ApiResponseService implements ResponseService {
  async processRequest<D>(process: Process<D>): Promise<DataResponse<D>> {
    try {
      const result = await process();
      const response: DataResponse<D> = {
        status: "success",
        data: result as D,
        errors: null,
      };
      return response;
    } catch (error: any) {
      const errs = ErrorProcessor.processError(error);
      return {
        status: "error",
        data: null,
        errors: errs,
      };
    }
  }

  static async response<D>(process: Process<D>): Promise<DataResponse<D>> {
    let req = new ApiResponseService();
    return req.processRequest<D>(process);
  }
}
