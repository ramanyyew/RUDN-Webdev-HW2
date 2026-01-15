export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  status: 0 | 1 | 2;
}

export type Status = 0 | 1 | 2;

export const statusText: { [key: number]: string } = {
  0: 'К выполнению',
  1: 'В работе',
  2: 'Выполнено',
};
