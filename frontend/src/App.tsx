import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Container, Spinner } from 'react-bootstrap';
import { deleteNote, fetchNotes } from './network/notesAPI';
import NewEditNoteDialog from './components/NewEditNoteDialog';

function App() {
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
    <Container>
      <Button onClick={() => setShowNewNoteDialog(true)}>Add New Note</Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Something went wrong</p>}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <Container className="notesContainer">
              {notes.map((note) => (
                <Note
                  note={note}
                  key={note._id}
                  onDeleteNoteClicked={removeNote}
                  onNoteClicked={(note) => setNoteToEdit(note)}
                />
              ))}
            </Container>
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
    </Container>
  );
}

export default App;
