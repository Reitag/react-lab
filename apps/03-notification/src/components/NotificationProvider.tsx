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
      return { notifications: [...state.notifications, action.payload] };
    case ActionTypes.remove:
      return { notifications: state.notifications.filter((elem) => elem.id !== action.payload.id) };
    case ActionTypes.clear:
      return { notifications: [] };
    default:
      return state;
  }
}

const initialState: State = {
  notifications: new Array<Notification>(),
};

const generateId = () => `${Date.now()}-${Math.random().toString(36)}`;

export function NotificationProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (args: {
    type: 'success' | 'error' | 'info';
    message: string;
    autoClose?: number;
  }) => {
    const id = crypto.randomUUID() ?? generateId();
    dispatch({
      type: ActionTypes.add,
      payload: { id: id, type: args.type, message: args.message },
    });

    if (args.autoClose) {
      setTimeout(() => {
        removeNotification(id);
      }, args.autoClose);
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
