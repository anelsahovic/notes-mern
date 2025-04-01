import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Container } from 'react-bootstrap';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error(error);
      }
    }

    getNotes();
  }, []);
  return (
    <Container className="notesContainer">
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </Container>
  );
}

export default App;
