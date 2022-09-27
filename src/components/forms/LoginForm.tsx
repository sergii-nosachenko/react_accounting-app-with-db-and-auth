import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button, Form, Icon, Notification,
} from 'react-bulma-components';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import { login, setAuthError } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { usePageError } from '../hooks/usePageError';

import { EStatus } from '../../types/Status.enum';

interface ILocationState {
  from: {
    pathname: string;
  };
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = usePageError('');

  const {
    user,
    error: authError,
    status,
  } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (status === EStatus.PENDING) {
      return;
    }

    dispatch(login({
      email,
      password,
    }));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuthError({
      errors: {
        ...authError.errors,
        email: '',
      },
    }));
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuthError({
      errors: {
        ...authError.errors,
        password: '',
      },
    }));
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const locState: ILocationState = location.state as ILocationState;

    navigate(locState?.from?.pathname || '/home');
  }, [user]);

  useEffect(() => {
    if (authError.message) {
      setError(authError.message);
    }
  }, [authError]);

  return (
    <form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Label htmlFor="email">
          Email
        </Form.Label>
        <Form.Control>
          <Form.Input
            type="email"
            name="email"
            placeholder="e.g. bobsmith@gmail.com"
            value={email}
            color={authError?.errors?.email && 'danger'}
            onChange={handleEmailChange}
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-envelope" />
          </Icon>
          {authError?.errors?.email && (
            <Icon
              size="small"
              align="right"
              color="danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          )}
        </Form.Control>
        {authError?.errors?.email && (
          <p className="help is-danger">{authError.errors.email}</p>
        )}
      </Form.Field>

      <Form.Field>
        <Form.Label htmlFor="password">
          Password
        </Form.Label>
        <Form.Control>
          <Form.Input
            type="password"
            name="password"
            placeholder="*******"
            value={password}
            color={authError?.errors?.password && 'danger'}
            onChange={handlePasswordChange}
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-lock" />
          </Icon>
          {authError?.errors?.password && (
            <Icon
              size="small"
              align="right"
              color="danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          )}
        </Form.Control>
        {authError?.errors?.password && (
          <p className="help is-danger">{authError.errors.password}</p>
        )}
      </Form.Field>

      <Form.Field kind="group">
        <GoogleLoginButton
          className="social-button"
        />
        <FacebookLoginButton
          className="social-button"
        />
        <GithubLoginButton
          className="social-button"
        />
      </Form.Field>

      {error && (
        <Form.Field>
          <Notification color="danger" light>
            {error}
          </Notification>
        </Form.Field>
      )}

      <Form.Field className="pt-4">
        <Button.Group>
          <Button
            color="success"
            type="submit"
            loading={status === EStatus.PENDING}
          >
            <Icon>
              <i className="fa-solid fa-right-to-bracket" />
            </Icon>
            <span>Log in</span>
          </Button>

          <Button
            inverted
            className="ml-auto mr-2"
            onClick={() => navigate('/sign-up')}
            disabled={status === EStatus.PENDING}
          >
            <Icon>
              <i className="fa-solid fa-user-plus" />
            </Icon>
            <span>Sign up</span>
          </Button>

          <Button
            inverted
            color="danger"
            onClick={() => navigate('/reset-password')}
            disabled={status === EStatus.PENDING}
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

export default LoginForm;
