import { Contact } from "../services/schemas/contactShema.js";
import { ParametersError } from "../helpers/errors.js";
// import { User } from "./schemas/userShema.js";

export const getContacts = async ({ page, limit, favorite }, id) => {
  if (favorite) {
    return Contact.find({ owner: id, favorite }).skip(page).limit(limit);
  }

  return Contact.find({ owner: id }).skip(page).limit(limit);
};

//   const user = await User.aggregate([
//     [
//       {
//         $lookup: {
//           from: "contacts",
//           localField: "_id",
//           foreignField: "owner",
//           as: "result",
//         },
//       },
//       {
//         $project: {
//           token: 0,
//           password: 0,
//         },
//       },
//     ],
//   ]);
//   return user;
// };

export const getContactsById = async (contactId) => {
  return Contact.findById({ _id: contactId });
};

export const addContact = async ({ name, email, phone }, id) => {
  return Contact.create({ name, email, phone, owner: id });
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
