import 'dotenv/config';
import express from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (req, res) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found!' });
});

export default app;
