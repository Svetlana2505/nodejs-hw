import Joi from "joi";

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
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
};
