import { Link } from 'react-router-dom';
import { Button, Form, Icon } from 'react-bulma-components';

const RegistrationForm: React.FC = () => {
  return (
    <form>
      <Form.Field>
        <Form.Label htmlFor="name">
          Name
        </Form.Label>
        <Form.Control className="has-icons-left">
          <Form.Input
            type="text"
            name="name"
            placeholder="John Doe"
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-user" />
          </Icon>
        </Form.Control>
      </Form.Field>

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

      <Form.Field>
        <Form.Control className="has-icons-left">
          <Form.Input
            type="password"
            name="password_repeat"
            placeholder="Repeat password"
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-lock-open" />
          </Icon>
        </Form.Control>
      </Form.Field>

      <Form.Field className="pt-4">
        <Button.Group>
          <Link to="/login">
            <Button
              outlined
            >
              <Icon>
                <i className="fa-solid fa-right-to-bracket" />
              </Icon>
              <span>Log in</span>
            </Button>
          </Link>

          <Button
            color="success"
            className="ml-auto"
          >
            <Icon>
              <i className="fa-solid fa-user-plus" />
            </Icon>
            <span>Sign up</span>
          </Button>
        </Button.Group>
      </Form.Field>
    </form>
  );
};

export default RegistrationForm;
