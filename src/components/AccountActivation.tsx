import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Content, Icon, Notification } from 'react-bulma-components';

import { activate } from '../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { EStatus } from '../types/Status.enum';

export const AccountActivation: React.FC = () => {
  const { activationToken } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    error: authError,
    status,
  } = useAppSelector(state => state.user);

  useEffect(() => {
    if (!activationToken) {
      return;
    }

    dispatch(activate(activationToken));
  }, [activationToken]);

  useEffect(() => {
    if (status === EStatus.SUCCESS) {
      navigate('/home');
    }
  }, [status]);

  return (
    <Content textAlign="center">
      <h1>
        {status === EStatus.PENDING && (
          <Icon>
            <i className="fas fa-spinner fa-pulse mr-4" />
          </Icon>
        )}
        Activating account
      </h1>
      {authError.message ? (
        <Notification color="danger" light>
          {authError.message}
        </Notification>
      ) : (
        <p>You will be forwarded to home page soon!</p>
      )}
    </Content>
  );
};
