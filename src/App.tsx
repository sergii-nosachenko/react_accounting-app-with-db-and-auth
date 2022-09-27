import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Entry from './pages/Entry';
import Home from './pages/Home';

import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import ResetPasswordForm from './components/forms/ResetPasswordForm';
import NotFound from './components/NotFound';
import { RequireAuth } from './components/RequireAuth';

import { useAppDispatch } from './redux/hooks';
import { checkAuth } from './redux/slices/userSlice';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import { AccountActivation } from './components/AccountActivation';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <RequireAuth>
              <Home />
            </RequireAuth>
          )}
        >
          <Route
            path="home"
            element={<Home />}
          />
        </Route>

        <Route
          path="/login"
          element={(
            <Entry title="Login to app">
              <LoginForm />
            </Entry>
          )}
        />

        <Route
          path="/sign-up"
          element={(
            <Entry title="Registration">
              <RegistrationForm />
            </Entry>
          )}
        />

        <Route
          path="activate/:activationToken"
          element={(
            <Entry title="Registration">
              <AccountActivation />
            </Entry>
          )}
        />

        <Route
          path="/reset-password"
          element={(
            <Entry title="Reset password">
              <ResetPasswordForm />
            </Entry>
          )}
        />

        <Route
          path="*"
          element={(
            <Entry title="404: Page not found">
              <NotFound />
            </Entry>
          )}
        />
      </Routes>
    </Router>
  );
}
