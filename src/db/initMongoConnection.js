import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/index.js';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const user = env(ENV_VARS.MONGODB_USER);
  const pwd = env(ENV_VARS.MONGODB_PASSWORD);
  const url = env(ENV_VARS.MONGODB_URL);
  const db = env(ENV_VARS.MONGODB_DB);

  const connectionLink = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`error connect mongoDB ${error}`);
  }
};
