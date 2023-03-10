import { Router } from "express";

import { contactValidation } from "../../validation/validationMiddleware.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";

import {
  getContactsController,
  contactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  patchContactController,
} from "../../controllers/contacts/contactsController.js";

export const router = new Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(contactByIdController));

router.post("/", contactValidation, asyncWrapper(postContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  contactValidation,
  asyncWrapper(putContactController)
);

router.patch("/:contactId/favorite", asyncWrapper(patchContactController));
