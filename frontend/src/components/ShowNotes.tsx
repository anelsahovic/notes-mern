import { Note as NoteModel } from '../models/note';

import { useEffect, useState } from 'react';
import NewEditNoteDialog from '../components/NewEditNoteDialog';
import { deleteNote, fetchNotes } from '../network/notesAPI';
import { Button, Spinner } from 'react-bootstrap';
import Note from './Note';

type Props = {};

const ShowNotes = (props: Props) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    getNotes();
  }, []);

  async function removeNote(note: NoteModel) {
    try {
      await deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="">
      <div className="d-flex justify-content-center">
        <Button
          className=" mt-4 mb-2"
          onClick={() => setShowNewNoteDialog(true)}
        >
          Add New Note
        </Button>
      </div>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Something went wrong</p>}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <div className="notesContainer">
              {notes.map((note) => (
                <Note
                  note={note}
                  key={note._id}
                  onDeleteNoteClicked={removeNote}
                  onNoteClicked={(note) => setNoteToEdit(note)}
                />
              ))}
            </div>
          ) : (
            <p>You don't have any notes yet.</p>
          )}
        </>
      )}

      {showNewNoteDialog && (
        <NewEditNoteDialog
          onDismiss={() => setShowNewNoteDialog(false)}
          onNoteSaved={(newNote) => {
            console.log('New Note', newNote);
            setNotes([...notes, newNote]);
            setShowNewNoteDialog(false);
          }}
        />
      )}

      {noteToEdit && (
        <NewEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </div>
  );
};

export default ShowNotes;
