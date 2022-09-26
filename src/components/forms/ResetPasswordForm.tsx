import { Link } from 'react-router-dom';
import { Button, Form, Icon } from 'react-bulma-components';

const ResetPasswordForm: React.FC = () => {
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
            color="danger"
            className="ml-auto"
          >
            <Icon>
              <i className="fa-solid fa-key" />
            </Icon>
            <span>Reset password</span>
          </Button>
        </Button.Group>
      </Form.Field>
    </form>
  );
};

export default ResetPasswordForm;
