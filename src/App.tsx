import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}
