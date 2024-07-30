import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();
const PORT = Number(process.env.PORT);

const app = express();

export function setupServer() {
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();
    res.json({ status: 200, message: 'Successfully found contacts!', data });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const data = await getContactById(req.params.contactId);
    if (!data) {
      return res.status(404).json({
        status: 400,
        message: `Contact not found`,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
