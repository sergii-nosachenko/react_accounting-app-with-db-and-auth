import {
  Navbar,
  Container,
  Button,
  Heading,
  Icon,
  Level,
} from 'react-bulma-components';

import { useAppDispatch } from '../redux/hooks';
import { setModalState } from '../redux/slices/modalSlice';
import { setCurrentExpenseId } from '../redux/slices/expenseSlice';

import { EModal } from '../types/Modal.enum';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleNewExpense = () => {
    dispatch(setCurrentExpenseId(null));
    dispatch(setModalState(EModal.NEW_EXPENSE));
  };

  const handleOpenProfile = () => {
    dispatch(setModalState(EModal.EDIT_USER));
  };

  return (
    <Navbar
      fixed="top"
      className="has-shadow py-2"
    >
      <Container>
        <Level className="is-flex-grow-1 px-2">
          <Level.Side align="left">
            <Level.Item>
              <Heading size={4}>
                <Icon
                  className="mr-2"
                  color="success"
                >
                  <i className="fa-solid fa-hand-holding-dollar" />
                </Icon>
                <span>Expenses manager</span>
              </Heading>
            </Level.Item>
            <Level.Item>
              <Button
                color="success"
                className="is-align-self-center"
                onClick={handleNewExpense}
              >
                <Icon>
                  <i className="fas fa-plus" />
                </Icon>
                <span>Add new expense</span>
              </Button>
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <Button.Group>
                <Button
                  inverted
                  className="is-align-self-center"
                  onClick={handleOpenProfile}
                >
                  <Icon>
                    <i className="fa-solid fa-user-gear" />
                  </Icon>
                  <span>Profile</span>
                </Button>

                <Button
                  color="danger"
                  outlined
                  className="is-align-self-center"
                >
                  <Icon>
                    <i className="fa-solid fa-right-from-bracket" />
                  </Icon>
                  <span>Log out</span>
                </Button>
              </Button.Group>
            </Level.Item>
          </Level.Side>
        </Level>
      </Container>
    </Navbar>
  );
};

export default Navigation;
