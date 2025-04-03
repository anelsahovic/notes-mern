import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
import { createNote, NoteInput, updateNote } from '../network/notesAPI';

interface Props {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const NewEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {noteToEdit ? 'Edit Note' : 'Create New Note'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="newEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register('title', { required: 'Required' })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register('text')}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="newEditNoteForm" disabled={isSubmitting}>
          {noteToEdit ? 'Save' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEditNoteDialog;
