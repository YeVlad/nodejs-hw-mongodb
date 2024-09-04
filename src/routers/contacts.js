import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsAllController,
  patchContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.use('/:contactId', isValidId);

router.get('/', ctrlWrapper(getContactsAllController));

router.get(
  '/:contactId',

  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),

  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',

  ctrlWrapper(deleteContactByIdController),
);

export default router;
