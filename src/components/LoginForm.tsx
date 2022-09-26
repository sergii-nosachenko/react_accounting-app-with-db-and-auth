import { Link } from 'react-router-dom';
import { Button, Form, Icon } from 'react-bulma-components';

const LoginForm: React.FC = () => {
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

      <Form.Field>
        <Form.Label htmlFor="password">
          Password
        </Form.Label>
        <Form.Control className="has-icons-left">
          <Form.Input
            type="password"
            name="password"
            placeholder="*******"
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-lock" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field className="pt-4">
        <Button.Group>
          <Link to="/sign-up">
            <Button
              inverted
              className="mr-2"
            >
              <Icon>
                <i className="fa-solid fa-user-plus" />
              </Icon>
              <span>Sign up</span>
            </Button>
          </Link>

          <Link to="/reset-password">
            <Button
              inverted
              color="danger"
            >
              <Icon>
                <i className="fa-solid fa-key" />
              </Icon>
              <span>Reset password</span>
            </Button>
          </Link>

          <Button
            color="success"
            className="ml-auto"
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

export default LoginForm;
