import {
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

import { createContact } from '../services/contacts.js';
import { deleteContact } from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import createHttpError from 'http-errors';

export const getContactController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({ status: 200, message: 'Successfully found contacts!', data });
};

export const getContactByIdController = async (req, res) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const data = await createContact(req.user);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contactId = req.params.contactId;

  const data = await deleteContact(contactId);

  if (!data) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
