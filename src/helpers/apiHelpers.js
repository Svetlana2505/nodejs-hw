import { ValidationError, ParametersError } from "./errors.js";

export const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(() => {
      if (ParametersError) {
        next(new ParametersError("missing field favorite"));
        return;
      }
      next(new ParametersError(`failure, co contact with id  fould`));
    });
  };
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof ParametersError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
};
