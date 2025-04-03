import styles from '../styles/Note.module.css';
import { Card, Button } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { format } from 'date-fns';

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  // Ensure dates are valid before formatting
  const formattedCreatedAt = createdAt
    ? format(new Date(createdAt), 'dd MMM yyyy, HH:mm')
    : 'N/A';
  const formattedUpdatedAt =
    updatedAt && updatedAt !== createdAt
      ? format(new Date(updatedAt), 'dd MMM yyyy, HH:mm')
      : null;

  return (
    <Card className={`${styles.noteCard} shadow-sm`}>
      <Card.Body>
        <Card.Title className={styles.cardTitle}>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>

        {/* Created & Updated Dates */}
        <div className={styles.noteMeta}>
          <small className="text-muted">Created: {formattedCreatedAt}</small>
          {formattedUpdatedAt && (
            <small className="text-muted">Updated: {formattedUpdatedAt}</small>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onNoteClicked(note)}
          >
            ✏️ Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          >
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;
