import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import {
  Button, Form, Icon, Notification,
} from 'react-bulma-components';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';

import { usePageError } from '../hooks/usePageError';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setModalState } from '../../redux/slices/modalSlice';

import { EModal } from '../../types/Modal.enum';
import { EStatus } from '../../types/Status.enum';
import { validatePassword } from '../../utils/validators';

const ProfileForm: React.FC = () => {
  const {
    user,
    error: authError,
    status,
  } = useAppSelector(state => state.user);

  const [error, setError] = usePageError('');

  const [username, setUsername] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordNewRepeat, setPasswordNewRepeat] = useState('');

  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordNewError, setPasswordNewError] = useState('');
  const [passwordNewRepeatError, setPasswordNewRepeatError] = useState('');

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    dispatch(setModalState(EModal.NONE));
  };

  type TInputHandler = (event: ChangeEvent<HTMLInputElement>) => void;

  const handleUsernameChange: TInputHandler = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange: TInputHandler = (event) => {
    setIsEmailChanged(event.target.value !== user?.email);
    setEmail(event.target.value);
  };

  const handlePasswordChange: TInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordNewChange: TInputHandler = (event) => {
    const { value } = event.target;

    setIsNewPassword(event.target.value !== '');
    setPasswordNew(event.target.value);

    if (value && !password) {
      setPasswordError('Password is required');

      return;
    }

    if (value && !validatePassword(value)) {
      setPasswordNewError('Minimal password length is 6 chars');

      return;
    }

    if (passwordNewRepeat && value !== passwordNewRepeat) {
      setPasswordNewRepeatError('Passwords do not match');

      return;
    }

    setPasswordNewError('');
    setPasswordNewRepeatError('');
  };

  const handlePasswordNewRepeatChange: TInputHandler = (event) => {
    const { value } = event.target;

    setPasswordNewRepeat(value);

    if (!value && !passwordNew) {
      setPasswordNewRepeatError('');

      return;
    }

    if (value !== passwordNew) {
      setPasswordNewRepeatError('Passwords do not match');

      return;
    }

    setPasswordNewRepeatError('');
  };

  useEffect(() => {
    if (authError.message) {
      setError(authError.message);
    }

    if (authError.errors?.username) {
      setUsernameError(authError.errors.username);
    }

    if (authError.errors?.email) {
      setEmailError(authError.errors.email);
    }

    if (authError.errors?.password) {
      setPasswordError(authError.errors.password);
    }

    if (authError.errors?.passwordNew) {
      setPasswordError(authError.errors.passwordNew);
    }
  }, [authError]);

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.Control>
          <Form.Input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            color={usernameError ? 'danger' : undefined}
            required
          />
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
        <Form.Label>Email</Form.Label>
        <Form.Control>
          <Form.Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            color={emailError ? 'danger' : undefined}
            required
          />
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
        <Form.Label>Current password</Form.Label>
        <Form.Control>
          <Form.Input
            type="password"
            name="password"
            value={password}
            placeholder="******"
            onChange={handlePasswordChange}
            color={passwordError ? 'danger' : undefined}
            required={isEmailChanged || isNewPassword}
          />
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
        <Form.Label>New password</Form.Label>

        <Form.Field horizontal>
          <Form.Field.Body>
            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="password"
                  name="passwordNew"
                  placeholder="******"
                  value={passwordNew}
                  onChange={handlePasswordNewChange}
                  color={passwordNewError ? 'danger' : undefined}
                />
                {passwordNewError !== '' && (
                  <Icon
                    size="small"
                    align="right"
                    color="danger"
                  >
                    <i className="fas fa-exclamation-triangle" />
                  </Icon>
                )}
              </Form.Control>
              {passwordNewError && (
                <p className="help is-danger">{passwordNewError}</p>
              )}
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="password"
                  name="passwordNewRepeat"
                  value={passwordNewRepeat}
                  placeholder="Repeat new password"
                  onChange={handlePasswordNewRepeatChange}
                  required={isNewPassword}
                  color={passwordNewRepeatError ? 'danger' : undefined}
                />
                {passwordNewRepeatError !== '' && (
                  <Icon
                    size="small"
                    align="right"
                    color="danger"
                  >
                    <i className="fas fa-exclamation-triangle" />
                  </Icon>
                )}
              </Form.Control>
              {passwordNewRepeatError && (
                <p className="help is-danger">{passwordNewRepeatError}</p>
              )}
            </Form.Field>
          </Form.Field.Body>
        </Form.Field>
      </Form.Field>

      <Form.Field kind="group">
        <GoogleLoginButton
          className="social-button"
          text="Connect Google"
        />

        <FacebookLoginButton
          className="social-button"
          text="Connect Facebook"
        />
        <GithubLoginButton
          className="social-button"
          text="Connect Github"
        />
      </Form.Field>

      {error && (
        <Form.Field>
          <Notification color="danger" light>
            {error}
          </Notification>
        </Form.Field>
      )}

      <Form.Field
        kind="group"
        className="pt-4"
      >
        <Form.Control>
          <Button
            color="success"
            type="submit"
            loading={status === EStatus.PENDING}
          >
            Save
          </Button>
        </Form.Control>
        <Form.Control>
          <Button
            color="link"
            colorVariant="light"
            onClick={handleCancel}
            disabled={status === EStatus.PENDING}
          >
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
};

export default ProfileForm;
