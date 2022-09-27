import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader } from 'react-bulma-components';

import { useAppSelector } from '../redux/hooks';

type TProps = {
  children?: React.ReactElement;
};

export const RequireAuth: React.FC<TProps> = ({ children }) => {
  const { isChecked, user } = useAppSelector(state => state.user);
  const location = useLocation();

  if (!isChecked) {
    return <Loader className="mx-auto is-size-1 mt-6" />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
