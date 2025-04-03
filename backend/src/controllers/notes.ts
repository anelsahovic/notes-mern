import { RequestHandler } from 'express';
import NoteModel from '../models/note';
import createHttpError from 'http-errors';
import { assertIsDefined } from '../utils/assertIsDefined';

export const getNotes: RequestHandler = async (req, res) => {
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);

    const notes = await NoteModel.find({ userId: authUserId }).exec();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getNote: RequestHandler = async (req, res) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, 'Note Not Found!');

    if (!note.userId.equals(authUserId))
      throw createHttpError(401, 'You can not access this note');

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);

    if (!title) throw createHttpError(400, 'Note is missing a title!');

    const newNote = await NoteModel.create({
      userId: authUserId,
      title: title,
      text: text,
    });

    res.status(201).json({ newNote });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);

    if (!newTitle) throw createHttpError(400, 'Note missing a title!');

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, 'Note Not Found!');

    if (!note.userId.equals(authUserId))
      throw createHttpError(401, 'You can not update this note');

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;

  try {
    assertIsDefined(authUserId);

    const note = await NoteModel.findById(noteId).exec();
    if (!note) throw createHttpError(404, 'Note Not Found!');

    if (!note.userId.equals(authUserId))
      throw createHttpError(401, 'You can not delete this note');

    await note.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
