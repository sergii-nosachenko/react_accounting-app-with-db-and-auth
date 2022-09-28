import { Content, Icon } from 'react-bulma-components';

export const ActivationSended: React.FC = () => {
  return (
    <Content textAlign="center">
      <h1>
        <Icon color="success">
          <i className="fa-solid fa-check mr-4" />
        </Icon>
        Successful
      </h1>
      <p>Check your email!</p>
      <p>We have sent you an email with the activation link.</p>
    </Content>
  );
};
