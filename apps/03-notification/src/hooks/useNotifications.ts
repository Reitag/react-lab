import { NotificationContext, NotificationContextConfig } from '@/context/NotificationContext';
import { useContext } from 'react';

export function useNotifications(): NotificationContextConfig {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('Context have not been created');

  return context;
}
