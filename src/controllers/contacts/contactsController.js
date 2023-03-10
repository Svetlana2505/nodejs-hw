import {
  updateStatusContact,
  getContacts,
  getContactsById,
  addContact,
  changeContact,
  deleteContact,
} from "../../services/contactsService.js";

export const getContactsController = async (req, res, next) => {
  const { page, limit, favorite } = req.query;

  const contacts = await getContacts(page, limit, favorite);

  res.json({ contacts, page, limit });
};

export const contactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactsById(contactId);

  res.json({ contact, status: "success" });
};

export const postContactController = async (req, res) => {
  const { name, email, phone } = req.body;

  await addContact({ name, email, phone });

  res.json({ status: "success" });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  await deleteContact(contactId);

  res.json({ status: "contact deleted" });
};

export const putContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  await changeContact(contactId, { name, email, phone });

  res.json({ status: "success" });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await updateStatusContact(contactId, req.body);

  res.json({ contact });
};
