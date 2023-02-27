import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const contactPath = path.join(__dirname, "/contacts.json");

export const listContacts = async () => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactPath, "utf-8"));
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactPath, "utf-8"));

    const checkContactId = contacts.some(({ id }) => id === contactId);

    if (!checkContactId) {
      return false;
    }

    const contact = contacts.filter(({ id }) => id === contactId);

    return contact;
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactPath, "utf-8"));

    const checkContactId = data.some(({ id }) => id === contactId);

    if (!checkContactId) {
      return false;
    }

    const contacts = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(contacts));

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const addContact = async (body) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactPath, "utf-8"));
    contacts.push(body);
    await fs.writeFile(contactPath, JSON.stringify(contacts));

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactPath, "utf-8"));

    const checkContactId = contacts.some(({ id }) => id === contactId);

    if (!checkContactId) {
      return false;
    }

    contacts.forEach((contact) => {
      if (contact.id === contactId) {
        contact.email = email;
        contact.name = name;
        contact.phone = phone;
      }
    });
    await fs.writeFile(contactPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    console.log(error);
  }
};
