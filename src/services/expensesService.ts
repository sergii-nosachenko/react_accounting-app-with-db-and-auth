import { httpClient } from '../http/httpClient';

import { IExpense } from '../types/Expense.interface';

async function getAll() {
  const expenses = await httpClient.get<IExpense[], IExpense[]>('/expenses');

  return expenses;
}

async function getById(expenseId: number) {
  const expense = await httpClient.get<IExpense, IExpense>(`/expenses/${expenseId}`);

  return expense;
}

async function remove(expenseId: number) {
  return httpClient.delete(`/expenses/${expenseId}`);
}

async function add(expense: Omit<IExpense, 'id'>) {
  const expenseAdded = await httpClient.post<IExpense, IExpense>(
    '/expenses', expense,
  );

  return expenseAdded;
}

async function patch(expense: IExpense) {
  const expensePatched = await httpClient.patch<IExpense, IExpense>(
    `/expenses/${expense.id}`, expense,
  );

  return expensePatched;
}

export const expensesService = {
  getAll,
  getById,
  remove,
  add,
  patch,
};
