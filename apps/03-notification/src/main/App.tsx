import { NotificationList } from '@/components/NotificationList';
import { NotificationProvider } from '@/components/NotificationProvider';

export default function App(): React.ReactNode {
  return (
    <NotificationProvider>
      <NotificationList />
    </NotificationProvider>
  );
}
