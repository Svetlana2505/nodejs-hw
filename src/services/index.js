import { Contact } from "./schemas/contactShema.js";
import { ParametersError } from "../helpers/errors.js";

export const getContacts = async () => {
  const contacts = await Contact.find();

  return contacts;
};

export const getContactsById = async (contactId) => {
  const contact = await Contact.findById({ _id: contactId });

  return contact;
};

export const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
};

export const deleteContact = async (contactId) => {
  await Contact.deleteOne({ _id: contactId });
};

export const changeContact = async (contactId, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } });
};

export const updateStatusContact = async (contactId, body) => {
  if (!body.favorite) {
    throw new ParametersError();
  }
  return await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite: body.favorite },
  });
};
