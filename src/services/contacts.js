import { Contact } from '../db/models/contact.js';

export async function getAllContacts() {
  return await Contact.find();
}

export async function getContactById(id) {
  return await Contact.findById(id);
}

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const data = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return data;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
