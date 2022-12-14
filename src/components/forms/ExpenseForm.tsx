import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { Button, Form, Loader } from 'react-bulma-components';

import { expensesService } from '../../services/expensesService';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchExpenses } from '../../redux/slices/expenseSlice';
import { setModalState } from '../../redux/slices/modalSlice';

import { IExpense } from '../../types/Expense.interface';
import { EModal } from '../../types/Modal.enum';

const normalizeDateForDb = (formDate: string) => {
  const normalized = new Date(formDate).toJSON();

  return normalized;
};

const normalizeDateForInput = (ISOdate: string) => {
  const normalized = new Date(ISOdate)
    .toLocaleString('sv')
    .replace(' ', 'T')
    .slice(0, -3);

  return normalized;
};

const ExpenseForm: React.FC = () => {
  const { variant } = useAppSelector(state => state.modal);
  const { currentExpenseId } = useAppSelector(state => state.expense);

  const [
    currentExpense,
    setCurrentExpense,
  ] = useState<IExpense | null>(null);

  const [formUser, setFormUser] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState(0);
  const [formCategory, setFormCategory] = useState('');
  const [formDate, setFormDate] = useState(
    normalizeDateForDb(new Date().toJSON()),
  );
  const [formNote, setFormNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    if (variant === EModal.NEW_EXPENSE) {
      expensesService.add({
        user: formUser,
        title: formTitle,
        category: formCategory,
        amount: formAmount,
        date: formDate,
        note: formNote,
      })
        .then(() => {
          dispatch(setModalState(EModal.NONE));
          dispatch(fetchExpenses());
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }

    if (variant === EModal.EDIT_EXPENSE) {
      if (!currentExpense) {
        setIsProcessing(false);

        return;
      }

      expensesService.patch({
        id: currentExpense.id,
        user: formUser,
        title: formTitle,
        category: formCategory,
        amount: formAmount,
        date: formDate,
        note: formNote,
      })
        .then(() => {
          dispatch(setModalState(EModal.NONE));
          dispatch(fetchExpenses());
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }
  };

  const handleCancel = () => {
    dispatch(setModalState(EModal.NONE));
  };

  const hadleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = normalizeDateForDb(new Date(event.target.value).toJSON());

    setFormDate(newDate);
  };

  useEffect(() => {
    if (!currentExpenseId) {
      return;
    }

    setIsLoading(true);

    expensesService.getById(currentExpenseId)
      .then(result => setCurrentExpense(result))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!currentExpense) {
      return;
    }

    const {
      user,
      title,
      category,
      amount,
      date,
      note,
    } = currentExpense;

    setFormUser(user);
    setFormTitle(title);
    setFormCategory(category);
    setFormAmount(amount);
    setFormDate(date);
    setFormNote(note);
  }, [currentExpense]);

  return (
    <>
      {isLoading && <Loader className="mx-auto is-size-1" />}
      {!isLoading && (
        <form onSubmit={handleFormSubmit}>
          <Form.Field>
            <Form.Label>User</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={formUser}
                onChange={(event) => setFormUser(event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Title</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={formTitle}
                onChange={(event) => setFormTitle(event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Category</Form.Label>
            <Form.Field>
              <Form.Control>
                <Form.Select
                  value={formCategory}
                  className="is-fullwidth"
                  onChange={(event) => setFormCategory(event.target.value)}
                  required
                >
                  <option value="" disabled key={0}>Select category</option>
                  {
                    [
                      'Food',
                      'Entertainment',
                      'Transport',
                      'Sport',
                      'Healthcare',
                      'Pets',
                      'Household',
                      'Charity',
                      'Travel',
                      'Shopping',
                    ].map(category => (
                      <option
                        value={category}
                        key={category}
                      >
                        {category}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Control>
            </Form.Field>
          </Form.Field>

          <Form.Field>
            <Form.Label>Amount</Form.Label>
            <Form.Control>
              <Form.Input
                type="number"
                min="0"
                value={formAmount}
                onChange={(event) => setFormAmount(+event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Date</Form.Label>
            <Form.Control>
              <Form.Input
                type="datetime-local"
                value={normalizeDateForInput(formDate)}
                onChange={hadleDateChange}
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label>Note</Form.Label>
            <Form.Textarea
              value={formNote}
              rows={1}
              onChange={(event) => setFormNote(event.target.value)}
            />
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

export default ExpenseForm;
