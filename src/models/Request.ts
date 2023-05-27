export const requestStatuses = {
  Accepted: 'Принята',
  Pending: 'В ожидании',
  Declined: 'Отклонена',
  Canceled: 'Отменена',
};

export type RequestStatusType = keyof typeof requestStatuses;

export interface Request {
  id: number;
  userId: number;
  status: RequestStatusType;
  description: string;
  isOuterRequest: boolean;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}
