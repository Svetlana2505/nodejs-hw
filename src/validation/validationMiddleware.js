import Joi from "joi";
import { ValidationError } from "../helpers/errors.js";

export const contactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().min(12).max(15).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    next(new ValidationError(JSON.stringify(validationResult.error.details)));
  }

  next();
};
