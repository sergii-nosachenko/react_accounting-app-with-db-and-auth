import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { Button, Form, Loader } from 'react-bulma-components';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setModalState } from '../redux/slices/modalSlice';

import { EModal } from '../types/Modal.enum';

const ProfileForm: React.FC = () => {
  const { user } = useAppSelector(state => state.user);

  const [formName, setFormName] = useState(user?.name ?? '');
  const [formEmail, setFormEmail] = useState(user?.email ?? '');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [formPasswordCurrent, setFormPasswordCurrent] = useState('');
  const [formPasswordNew, setFormPasswordNew] = useState('');
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [formPasswordNewRepeat, setFormPasswordNewRepeat] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
  };

  const handleCancel = () => {
    dispatch(setModalState(EModal.NONE));
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEmailChanged(event.target.value !== user?.email);
    setFormEmail(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsNewPassword(event.target.value !== '');
    setFormPasswordNew(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      {isLoading && <Loader className="mx-auto is-size-1" />}
      {!isLoading && (
        <form onSubmit={handleFormSubmit}>
          <Form.Field>
            <Form.Label>Name</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={formName}
                onChange={(event) => setFormName(event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Control>
              <Form.Input
                type="email"
                value={formEmail}
                onChange={handleEmailChange}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Current password</Form.Label>
            <Form.Control>
              <Form.Input
                type="password"
                value={formPasswordCurrent}
                placeholder="******"
                onChange={(event) => setFormPasswordCurrent(event.target.value)}
                required={isEmailChanged || isNewPassword}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>New password</Form.Label>

            <Form.Field horizontal>
              <Form.Field.Body>
                <Form.Field>
                  <Form.Control>
                    <Form.Input
                      type="password"
                      value={formPasswordNew}
                      placeholder="******"
                      onChange={handleNewPasswordChange}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Form.Control>
                    <Form.Input
                      type="password"
                      value={formPasswordNewRepeat}
                      placeholder="Repeat new password"
                      onChange={
                        (event) => setFormPasswordNewRepeat(event.target.value)
                      }
                      required={isNewPassword}
                    />
                  </Form.Control>
                </Form.Field>
              </Form.Field.Body>
            </Form.Field>
          </Form.Field>

          <Form.Field
            kind="group"
            className="pt-4"
          >
            <Form.Control>
              <Button
                color="success"
                type="submit"
                loading={isProcessing}
              >
                Save
              </Button>
            </Form.Control>
            <Form.Control>
              <Button
                color="link"
                colorVariant="light"
                onClick={handleCancel}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </Form.Control>
          </Form.Field>
        </form>
      )}
    </>
  );
};

export default ProfileForm;
