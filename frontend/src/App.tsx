import { useEffect, useState } from 'react';
import NavBar from './components/CustomNavbar';
import LoginDialog from './components/LoginDialog';
import SignUpDialog from './components/SignUpDialog';
import { User } from './models/user';
import { getLoggedInUser } from './network/userAPI';
import ShowNotes from './components/ShowNotes';
import HideNotes from './components/HideNotes';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginDialog(true)}
        onSignUpClicked={() => setShowSignUpDialog(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />

      {loggedInUser ? (
        <ShowNotes />
      ) : (
        <HideNotes
          onLoginClicked={() => setShowLoginDialog(true)}
          onSignUpClicked={() => setShowSignUpDialog(true)}
        />
      )}

      {showSignUpDialog && (
        <SignUpDialog
          onDismiss={() => setShowSignUpDialog(false)}
          onSignUpSuccess={(user) => {
            setLoggedInUser(user);
            setShowSignUpDialog(false);
          }}
        />
      )}

      {showLoginDialog && (
        <LoginDialog
          onDismiss={() => setShowLoginDialog(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginDialog(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
