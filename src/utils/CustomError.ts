export default class CustomError extends Error {
  public status: number;
  
  constructor(message:string, status: number) {
    super();
    this.message = message;
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}