import app from './app';
import env from './utils/validateEnv';
import mongoose from 'mongoose';

const PORT = env.PORT;

mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to Database');

    app.listen(PORT, () => {
      console.log('Server running on port: ', PORT);
    });
  })
  .catch(console.error);
