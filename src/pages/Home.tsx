import { useEffect } from 'react';
import {
  Card,
  Loader,
  Notification,
  Container,
  Section,
} from 'react-bulma-components';

import ExpensesList from '../components/ExpensesList';

import { fetchExpenses } from '../redux/slices/expenseSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { EStatus } from '../types/Status.enum';
import Navigation from '../components/Navigation';
import ExpenseModal from '../components/Modal';
import { checkAuth } from '../redux/slices/userSlice';

const Home: React.FC = () => {
  const { expenses, status } = useAppSelector(state => state.expense);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    document.title = 'Expenses manager';
  }, []);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  return (
    <>
      <Navigation />

      <Section
        className="has-background-link-light"
      >
        <Container>
          <Card>
            <Card.Content>
              {status === EStatus.PENDING && (
                <Loader className="mx-auto is-size-1" />
              )}
              {status === EStatus.ERROR && (
                <Notification color="danger">
                  Error occured while loading data from server.
                </Notification>
              )}
              {status === EStatus.SUCCESS && !expenses.length && (
                <Notification color="info">
                  No saved expenses found. Be first to add!
                </Notification>
              )}
              {status === EStatus.SUCCESS && expenses.length > 0 && (
                <ExpensesList
                  expenses={expenses}
                />
              )}
            </Card.Content>
          </Card>
        </Container>
      </Section>

      <ExpenseModal />
    </>
  );
};

export default Home;
