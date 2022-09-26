import { Notification } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Notification color="warning">
    {'Page does not exist! '}
    <Link to="/">Go to Homepage</Link>
  </Notification>
);

export default NotFound;
