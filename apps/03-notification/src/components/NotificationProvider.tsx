import { useReducer } from 'react';
import {
  NotificationContext,
  NotificationContextConfig,
  State,
  Notification,
} from '@/context/NotificationContext';

enum ActionTypes {
  add = 'ADD_NOTIFICATION',
  remove = 'REMOVE_NOTIFICATION',
  clear = 'CLEAR_ALL',
}

type Action =
  | { type: ActionTypes.add; payload: Notification }
  | { type: ActionTypes.remove; payload: { id: string } }
  | { type: ActionTypes.clear };

function notificationReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.add:
      return { ...state, notifications: [...state.notifications, action.payload] };
    case ActionTypes.remove:
      return {
        ...state,
        notifications: state.notifications.filter((elem) => elem.id !== action.payload.id),
      };
    case ActionTypes.clear:
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

const initialState: State = {
  notifications: new Array<Notification>(),
};

export function NotificationProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (notification: Notification, autoClose?: number) => {
    dispatch({ type: ActionTypes.add, payload: notification });

    if (autoClose && autoClose > 0) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, autoClose * 1000);
    }
  };

  const removeNotification = (id: string) => {
    dispatch({ type: ActionTypes.remove, payload: { id: id } });
  };

  const clearAll = () => {
    dispatch({ type: ActionTypes.clear });
  };

  const contextValue: NotificationContextConfig = {
    state,
    addNotification,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
}
