import {
  Button,
  Heading,
  Hero,
  Icon,
  Container,
  Columns,
  Box,
  Form,
  Level,
} from 'react-bulma-components';

const Login: React.FC = () => {
  return (
    <Hero className="has-background-success is-fullheight">
      <Hero.Body>
        <Container>
          <Columns centered>
            <Columns.Column
              tablet={{ size: 8 }}
              desktop={{ size: 6 }}
              widescreen={{ size: 5 }}
            >
              <Box
                renderAs="form"
              >
                <Heading size={4} className="has-text-centered py-4">
                  <Icon
                    aria-label="Delete"
                    className="mr-2"
                    color="success"
                  >
                    <i className="fa-solid fa-hand-holding-dollar" />
                  </Icon>
                  <span>Expenses manager</span>
                </Heading>

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

                <Form.Field>
                  <Form.Label htmlFor="password">
                    Password
                  </Form.Label>
                  <Form.Control className="has-icons-left">
                    <Form.Input
                      type="password"
                      name="password"
                      placeholder="*******"
                      required
                    />
                    <Icon
                      size="small"
                      align="left"
                    >
                      <i className="fa fa-lock" />
                    </Icon>
                  </Form.Control>
                </Form.Field>

                <Form.Field>
                  <Level className="is-flex-grow-1 px-2">
                    <Level.Side align="right">
                      <Level.Item>
                        <Button
                          color="success"
                        >
                          <Icon>
                            <i className="fa-solid fa-right-to-bracket" />
                          </Icon>
                          <span>Log in</span>
                        </Button>
                      </Level.Item>
                    </Level.Side>
                  </Level>
                </Form.Field>
              </Box>
            </Columns.Column>
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default Login;
