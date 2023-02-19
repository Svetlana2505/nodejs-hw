import { v4 as uuidv4 } from "uuid";

import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../models/contacts.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({ contacts });
  } catch (error) {
    console.log(error);
  }
};

export const contactById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      throw new Error();
    }

    res.json({ contact });
  } catch {
    res.status(400).json({ message: "Not found" });
  }
};

export const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const contacts = await addContact({ id: uuidv4(), name, email, phone });
    res.status(201).json({ contacts });
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
  }
};

export const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId);

    if (!data) {
      throw new Error();
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

export const putContact = async (req, res, next) => {
  try {
    const contacts = await updateContact(req.params.contactId, req.body);

    if (!contacts) {
      throw new Error();
    }

    res.json({ contacts });
  } catch (error) {
    res.status(400).json({ message: "Not found" });
  }
};
