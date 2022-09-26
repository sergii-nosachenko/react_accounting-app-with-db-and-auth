import { useEffect } from 'react';
import {
  Heading,
  Hero,
  Icon,
  Container,
  Columns,
  Box,
} from 'react-bulma-components';

type TProps = {
  title?: string;
  children?: React.ReactElement | React.ReactElement[];
};

const Entry: React.FC<TProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title || 'Expenses manager';
  }, [title]);

  return (
    <Hero className="has-background-success is-fullheight">
      <Hero.Body>
        <Container>
          <Columns centered>
            <Columns.Column
              tablet={{ size: 8 }}
              desktop={{ size: 7 }}
              widescreen={{ size: 7 }}
            >
              <Box>
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

                {children}
              </Box>
            </Columns.Column>
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default Entry;
