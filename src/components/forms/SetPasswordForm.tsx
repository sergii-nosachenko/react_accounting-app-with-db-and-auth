import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import {
  Navigate, useLocation, useNavigate, useParams,
} from 'react-router-dom';

import {
  Button,
  Form,
  Icon,
  Notification,
} from 'react-bulma-components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { usePageError } from '../../hooks/usePageError';
import { resetPassword, setAuthError } from '../../redux/slices/userSlice';

import { EStatus } from '../../types/Status.enum';
import { validatePassword } from '../../utils/validators';

const SetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { resetToken = '' } = useParams();

  const {
    user,
    error: authError,
    status,
  } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const [error, setError] = usePageError('');

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  type TInputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === EStatus.PENDING) {
      return;
    }

    dispatch(resetPassword({
      password,
      resetToken,
    }));
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

    if (!value) {
      setPasswordRepeatError('Repeat password');

      return;
    }

    if (password !== value) {
      setPasswordRepeatError('Passwords do not match');

      return;
    }

    setPasswordRepeatError('');
  };

  useEffect(() => {
    if (authError?.message) {
      setError(authError.message);
      dispatch(setAuthError({
        ...authError,
        message: '',
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

  useEffect(() => {
    if (status === EStatus.SUCCESS) {
      dispatch(setAuthError({}));

      navigate('/');
    }
  }, [status]);

  if (user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label htmlFor="password">
          New password
        </Form.Label>
        <Form.Control>
          <Form.Input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            color={passwordError ? 'danger' : undefined}
            placeholder="******"
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-envelope" />
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
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={handlePasswordRepeatChange}
            color={passwordRepeatError ? 'danger' : undefined}
            placeholder="Repeat password"
            required
          />
          <Icon
            size="small"
            align="left"
          >
            <i className="fa fa-envelope" />
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
            disabled={
              password === ''
              || passwordRepeat === ''
              || status === EStatus.PENDING
            }
          >
            <Icon>
              <i className="fa-solid fa-key" />
            </Icon>
            <span>Set new password</span>
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

export default SetPasswordForm;
