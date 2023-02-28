export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class ParametersError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
