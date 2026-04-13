import { createContext } from 'react';

export type Notification = {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
};

export type State = {
  notifications: Notification[];
};

export interface NotificationContextConfig {
  state: State;
  addNotification: (args: {
    type: 'success' | 'error' | 'info';
    message: string;
    autoClose?: number;
  }) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const NotificationContext = createContext<NotificationContextConfig | null>(null);
