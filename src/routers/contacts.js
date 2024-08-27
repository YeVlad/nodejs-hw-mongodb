import { Router } from 'express';

import {
  getContactController,
  getContactByIdController,
  createContactController,
  deleteStudentController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts,', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteStudentController));

router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch('/students/:studentId', ctrlWrapper(patchContactController));

export default router;
