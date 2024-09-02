import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.gender) {
    contactsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    contactsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    contactsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    contactsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    contactsQuery.where('avgMark').gte(filter.minAvgMark);
  }

  const [contactsCount, data] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: data,
    ...paginationData,
  };
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
