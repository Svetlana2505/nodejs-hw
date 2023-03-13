import {
  updateStatusContact,
  getContacts,
  getContactsById,
  addContact,
  changeContact,
  deleteContact,
} from "../../services/contactsService.js";

export const getContactsController = async (req, res, next) => {
  console.log(req.user);
  // const token = req.headers["authorization"].split(" ");
  // console.log(token);

  const { page, limit, favorite } = req.query;
  const { _id } = req.user;
  const contacts = await getContacts({ page, limit, favorite }, _id);

  res.json({ contacts, page, limit });
};

export const contactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactsById(contactId);

  res.json({ contact, status: "success" });
};

export const postContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const _id = req.user;

  await addContact({ name, email, phone }, _id);

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
