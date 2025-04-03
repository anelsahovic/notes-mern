import React from 'react';
import ShowNotes from '../components/ShowNotes';
import HideNotes from '../components/HideNotes';
import { User } from '../models/user';

interface Props {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NotesPage = ({
  loggedInUser,
  onLoginClicked,
  onSignUpClicked,
}: Props) => {
  return (
    <>
      {loggedInUser ? (
        <ShowNotes />
      ) : (
        <HideNotes
          onLoginClicked={onLoginClicked}
          onSignUpClicked={onSignUpClicked}
        />
      )}
    </>
  );
};

export default NotesPage;
