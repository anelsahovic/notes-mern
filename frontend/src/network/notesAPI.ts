import { ConflictError, UnauthorizedError } from '../errors/http_errors';
import { Note } from '../models/note';

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw new Error(
        'Error status code: ' +
          response.status +
          ', Error Message: ' +
          errorMessage
      );
    }
  }
}

export async function fetchNotes() {
  const response = await fetchData('/api/notes', { method: 'GET' });
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData('api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  const data = await response.json();
  return data.newNote;
}

export async function updateNote(noteId: string, note: NoteInput) {
  const response = await fetchData('/api/notes/' + noteId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });

  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData('/api/notes/' + noteId, { method: 'DELETE' });
}
