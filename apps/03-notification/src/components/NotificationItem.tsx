import { useNotifications } from '@/hooks/useNotifications';

type Props = {
  id: string;
  message: string;
};

export function NotificationItem(props: Props): React.ReactNode {
  const { removeNotification } = useNotifications();
  const { id, message } = props;

  return (
    <div key={id} style={{ display: 'flex', padding: '10px' }}>
      <div style={{ width: '200px' }}>{message}</div>
      <button onClick={() => removeNotification(id)}>Remove</button>
    </div>
  );
}
