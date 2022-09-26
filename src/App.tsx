import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Entry from './pages/Entry';
import Main from './pages/Main';

import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import ResetPasswordForm from './components/forms/ResetPasswordForm';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

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
          path="/reset-password"
          element={(
            <Entry title="Reset password">
              <ResetPasswordForm />
            </Entry>
          )}
        />

        <Route path="/main" element={<Main />} />
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
