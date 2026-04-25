import { useNotifications } from '@/hooks/useNotifications';

type Props = {
  notification: {
    id: string;
    message: string;
  };
};

export function NotificationItem(props: Props): React.ReactNode {
  const { removeNotification } = useNotifications();
  const { notification } = props;

  return (
    <div style={{ marginBottom: '10px', borderLeft: '3px solid blue', paddingLeft: '10px' }}>
      <div style={{ display: 'flex', padding: '10px' }}>
        <div style={{ width: '200px' }}>{notification.message}</div>
        <button onClick={() => removeNotification(notification.id)}>Remove</button>
      </div>
    </div>
  );
}
