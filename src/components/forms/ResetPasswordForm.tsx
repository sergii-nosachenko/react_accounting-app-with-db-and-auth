import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Icon,
  Notification,
} from 'react-bulma-components';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { usePageError } from '../../hooks/usePageError';
import { usePageSuccess } from '../../hooks/usePageSuccess';
import { reset, setAuthError } from '../../redux/slices/userSlice';

import { EStatus } from '../../types/Status.enum';

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    error: authError,
    status,
  } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const [error, setError] = usePageError('');
  const [success, setSuccess] = usePageSuccess('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [requested, setRequested] = useState(false);

  type TInputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status.reset === EStatus.PENDING) {
      return;
    }

    dispatch(reset(email));

    setRequested(true);
  };

  const handleEmailChange: TInputHandler = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (authError?.message) {
      setError(authError.message);
      dispatch(setAuthError({
        ...authError,
        message: '',
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
  }, [authError]);

  useEffect(() => {
    if (!requested) {
      return;
    }

    if (status.reset === EStatus.SUCCESS) {
      setSuccess('Email was sent successfully');
      dispatch(setAuthError({}));

      setTimeout(() => {
        navigate('/');
      }, 4000);
    }

    if (status.reset === EStatus.ERROR) {
      setRequested(false);
    }
  }, [requested, status]);

  if (user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label htmlFor="email">
          Email
        </Form.Label>
        <Form.Control>
          <Form.Input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            color={emailError ? 'danger' : undefined}
            placeholder="e.g. bobsmith@gmail.com"
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

      {error && (
        <Form.Field>
          <Notification color="danger" light>
            {error}
          </Notification>
        </Form.Field>
      )}

      {success && (
        <Form.Field>
          <Notification color="success" light>
            {success}
          </Notification>
        </Form.Field>
      )}

      <Form.Field className="pt-4">
        <Button.Group>
          <Button
            color="danger"
            type="submit"
            loading={status.reset === EStatus.PENDING}
            disabled={email === '' || status.reset === EStatus.PENDING}
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
