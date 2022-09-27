import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Icon } from 'react-bulma-components';
import { useAppSelector } from '../../redux/hooks';

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector(state => state.user);

  if (user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return (
    <form>
      <Form.Field>
        <Form.Label htmlFor="email">
          Email
        </Form.Label>
        <Form.Control className="has-icons-left">
          <Form.Input
            type="email"
            name="email"
            placeholder="e.g. bobsmith@gmail.com"
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-envelope" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field className="pt-4">
        <Button.Group>
          <Button
            color="danger"
          >
            <Icon>
              <i className="fa-solid fa-key" />
            </Icon>
            <span>Reset password</span>
          </Button>

          <Button
            outlined
            className="ml-auto"
            onClick={() => navigate('/login')}
          >
            <Icon>
              <i className="fa-solid fa-right-to-bracket" />
            </Icon>
            <span>Log in</span>
          </Button>
        </Button.Group>
      </Form.Field>
    </form>
  );
};

export default ResetPasswordForm;
