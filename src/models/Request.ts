export const requestStatuses = {
  Accepted: 'Принята',
  Pending: 'В ожидании',
  Declined: 'Отклонена',
  Canceled: 'Отменена',
};

type RequestStatusType = keyof typeof requestStatuses;

export interface Request {
  id: number;
  userId: number;
  status: RequestStatusType;
  description: string;
  createdAt: string;
  updatedAt: string;
}
