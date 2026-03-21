export class ApiError extends Error {
  constructor(error = {}) {
    super(error.message || "Something went wrong");

    this.statusCode = error.status || error.statusCode || 500; 
    this.status = this.statusCode; 
    this.code = error.code || "INTERNAL_ERROR";
  }
}
