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
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.use('/:contactId', isValidId);

router.get('/', ctrlWrapper(getContactsAllController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),

  ctrlWrapper(patchContactController),
);

router.put(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),

  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',

  ctrlWrapper(deleteContactByIdController),
);

export default router;
