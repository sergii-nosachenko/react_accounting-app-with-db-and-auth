import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Form,
  Icon,
  Notification,
} from 'react-bulma-components';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { register, setAuthError } from '../../redux/slices/userSlice';
import { EStatus } from '../../types/Status.enum';
import { validateEmail, validatePassword } from '../../utils/validators';
import { ActivationSended } from '../ActivationSended';
import { usePageError } from '../../hooks/usePageError';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    error: authError,
    status,
  } = useAppSelector(state => state.user);

  const [error, setError] = usePageError('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  const [registered, setRegistered] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status.register === EStatus.SUCCESS) {
      setRegistered(true);
    }
  }, [status]);

  useEffect(() => {
    if (authError?.message) {
      setError(authError.message);
      dispatch(setAuthError({
        ...authError,
        message: '',
      }));
    }

    if (authError?.errors?.username) {
      setUsernameError(authError.errors.username);
      dispatch(setAuthError({
        ...authError,
        errors: {
          ...authError.errors,
          username: '',
        },
      }));
    }

    if (authError?.errors?.email) {
      setEmailError(authError.errors.email);
      dispatch(setAuthError({
        ...authError,
        errors: {
          ...authError.errors,
          email: '',
        },
      }));
    }

    if (authError?.errors?.password) {
      setPasswordError(authError.errors.password);
      dispatch(setAuthError({
        ...authError,
        errors: {
          ...authError.errors,
          password: '',
        },
      }));
    }
  }, [authError]);

  if (user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (status.register === EStatus.PENDING) {
      return;
    }

    setRegistered(false);

    dispatch(register({
      username,
      email,
      password,
    }));
  };

  type TInputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

  const handleUsernameChange: TInputHandler = (event) => {
    const { value } = event.target;

    setUsername(value);

    if (!value) {
      setUsernameError('Username is required');

      return;
    }

    setUsernameError('');
  };

  const handleEmailChange: TInputHandler = (event) => {
    const { value } = event.target;

    setEmail(value);

    if (!value) {
      setEmailError('Email is required');

      return;
    }

    if (!validateEmail(value)) {
      setEmailError('Email is incorrect');

      return;
    }

    setEmailError('');
  };

  const handlePasswordChange: TInputHandler = (event) => {
    const { value } = event.target;

    setPassword(value);

    if (!value) {
      setPasswordError('Password is required');

      return;
    }

    if (!validatePassword(value)) {
      setPasswordError('Minimal password length is 6 chars');

      return;
    }

    if (passwordRepeat && value !== passwordRepeat) {
      setPasswordRepeatError('Passwords do not match');

      return;
    }

    setPasswordError('');
  };

  const handlePasswordRepeatChange: TInputHandler = (event) => {
    const { value } = event.target;

    setPasswordRepeat(value);

    if (value !== password) {
      setPasswordRepeatError('Passwords do not match');

      return;
    }

    setPasswordRepeatError('');
  };

  if (registered) {
    return <ActivationSended />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Label htmlFor="username">
          Username
        </Form.Label>
        <Form.Control>
          <Form.Input
            type="text"
            name="username"
            placeholder="John Doe"
            value={username}
            onChange={handleUsernameChange}
            color={usernameError ? 'danger' : undefined}
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-user" />
          </Icon>
          {usernameError !== '' && (
            <Icon
              size="small"
              align="right"
              color="danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          )}
        </Form.Control>
        {usernameError && (
          <p className="help is-danger">{usernameError}</p>
        )}
      </Form.Field>

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
            onChange={handleEmailChange}
            color={emailError ? 'danger' : undefined}
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-envelope" />
          </Icon>
          {emailError !== '' && (
            <Icon
              size="small"
              align="right"
              color="danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          )}
        </Form.Control>
        {emailError && (
          <p className="help is-danger">{emailError}</p>
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
            onChange={handlePasswordChange}
            color={passwordError ? 'danger' : undefined}
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-lock" />
          </Icon>
          {passwordError !== '' && (
            <Icon
              size="small"
              align="right"
              color="danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          )}
        </Form.Control>
        {passwordError && (
          <p className="help is-danger">{passwordError}</p>
        )}
      </Form.Field>

      <Form.Field>
        <Form.Control>
          <Form.Input
            type="password"
            name="password_repeat"
            placeholder="Repeat password"
            value={passwordRepeat}
            onChange={handlePasswordRepeatChange}
            color={passwordRepeatError ? 'danger' : undefined}
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-lock-open" />
          </Icon>
          {passwordRepeatError !== '' && (
            <Icon
              size="small"
              align="right"
              color="danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </Icon>
          )}
        </Form.Control>
        {passwordRepeatError && (
          <p className="help is-danger">{passwordRepeatError}</p>
        )}
      </Form.Field>

      <Form.Field kind="group">
        <GoogleLoginButton
          className="social-button"
          text="Sign in with Google"
        />

        <FacebookLoginButton
          className="social-button"
          text="Sign in with Facebook"
        />
        <GithubLoginButton
          className="social-button"
          text="Sign in with Github"
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
            loading={status.register === EStatus.PENDING}
          >
            <Icon>
              <i className="fa-solid fa-user-plus" />
            </Icon>
            <span>Sign up</span>
          </Button>

          <Button
            outlined
            className="ml-auto"
            onClick={() => navigate('/login')}
            disabled={status.register === EStatus.PENDING}
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

export default RegistrationForm;
