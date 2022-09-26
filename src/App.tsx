import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Entry from './pages/Entry';
import Main from './pages/Main';

import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ResetPasswordForm from './components/ResetPasswordForm';

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
            <Entry>
              <LoginForm />
            </Entry>
          )}
        />

        <Route
          path="/sign-up"
          element={(
            <Entry>
              <RegistrationForm />
            </Entry>
          )}
        />

        <Route
          path="/reset-password"
          element={(
            <Entry>
              <ResetPasswordForm />
            </Entry>
          )}
        />

        <Route path="/main" element={<Main />} />
        <Route
          path="*"
          element={(
            <Entry>
              <NotFound />
            </Entry>
          )}
        />
      </Routes>
    </Router>
  );
}
