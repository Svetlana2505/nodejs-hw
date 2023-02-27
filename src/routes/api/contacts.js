import { Router } from "express";

import { contactValidation } from "../../validation/validationMiddleware.js";
import {
  getContacts,
  contactById,
  postContact,
  deleteContact,
  putContact,
} from "../../controllers/contactsController.js";

export const router = new Router();

router.get("/", getContacts);

router.get("/:contactId", contactById);

router.post("/", contactValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation, putContact);
