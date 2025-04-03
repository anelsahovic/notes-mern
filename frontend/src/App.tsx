import { useEffect, useState } from 'react';
import NavBar from './components/CustomNavbar';
import LoginDialog from './components/LoginDialog';
import SignUpDialog from './components/SignUpDialog';
import { User } from './models/user';
import { getLoggedInUser } from './network/userAPI';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

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
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginDialog(true)}
          onSignUpClicked={() => setShowSignUpDialog(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/notes"
              element={
                <NotesPage
                  loggedInUser={loggedInUser}
                  onLoginClicked={() => setShowLoginDialog(true)}
                  onSignUpClicked={() => setShowSignUpDialog(true)}
                />
              }
            />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

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
    </BrowserRouter>
  );
}

export default App;
