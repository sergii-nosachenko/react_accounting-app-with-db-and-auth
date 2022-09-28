import { Modal } from 'react-bulma-components';

import ProfileForm from './forms/ProfileForm';
import ExpenseForm from './forms/ExpenseForm';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setModalState } from '../redux/slices/modalSlice';

import { EModal } from '../types/Modal.enum';
import { setAuthError } from '../redux/slices/userSlice';

const ExpenseModal: React.FC = () => {
  const { variant } = useAppSelector(state => state.modal);
  const { currentExpenseId } = useAppSelector(state => state.expense);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setAuthError({}));
    dispatch(setModalState(EModal.NONE));
  };

  return (
    <Modal
      show={variant !== EModal.NONE}
      onClose={handleCloseModal}
    >
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>
            {{
              [EModal.NONE]: '',
              [EModal.NEW_EXPENSE]: (
                <>
                  <i className="fa-solid fa-hand-holding-dollar mr-3" />
                  New expense
                </>
              ),
              [EModal.EDIT_EXPENSE]: (
                <>
                  <i className="fa-solid fa-hand-holding-dollar mr-3" />
                  {`Edit expense #${currentExpenseId}`}
                </>
              ),
              [EModal.EDIT_USER]: (
                <>
                  <i className="fa-solid fa-user mr-3" />
                  User profile
                </>
              ),
            }[variant]}
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          {
            (variant === EModal.NEW_EXPENSE || variant === EModal.EDIT_EXPENSE)
            && (
              <ExpenseForm key={Math.random()} />
            )
          }
          {
            (variant === EModal.EDIT_USER)
            && (
              <ProfileForm key={Math.random()} />
            )
          }
        </Modal.Card.Body>
        <Modal.Card.Footer className="p-1" />
      </Modal.Card>
    </Modal>
  );
};

export default ExpenseModal;
