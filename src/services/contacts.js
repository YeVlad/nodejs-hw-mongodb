import { SORT_ORDER } from '../constants/index.js';
import { Contacts, patchContact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  user,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = patchContact.find({ userId: user._id });

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const contactsCount = await patchContact
    .find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = await calculatePaginationData(
    contactsCount,
    perPage,
    page,
  );
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id, user) => {
  return await Contacts.findOne({ _id: id, userId: user._id });
};

export const postContact = async (payload, user) => {
  const contact = await patchContact.create({ ...payload, userId: user._id });
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const rawResult = await Contacts.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
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

export const deleteContact = async (contactId, user) => {
  const contact = Contacts.findOneAndDelete({
    _id: contactId,
    userId: user._id,
  });

  return contact;
};
