import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from './NotificationItem';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

interface NotificationFormState {
  message: string | undefined;
  autoClose: number | undefined;
}

/** null vs undefined */
/** undefined - используется с переменной, которой не присвоили значение */

const a; // undefined, значения нет

/** null - используется с переменной, которой намеренно присвоили значение null */

const b = null; // null, значение есть

export function NotificationList(): React.ReactNode {
  const [notification, setNotification] = useState<NotificationFormState>({
    message: undefined,
    autoClose: undefined,
  });
  const { state, addNotification, clearAll } = useNotifications();

  const handleChange = (field: keyof NotificationFormState, value: number | string) => {
    setNotification((notification) => ({ ...notification, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    /** early return (DX) */
    if (!notification?.message?.trim()) {
      return;
    }

    addNotification(
      {
        id: uuidv4(),
        type: 'info',
        message: notification.message,
      },
      notification.autoClose
    );

    /** DX */
    resetForm();
  };

  const resetForm = () => {
    setNotification({ message: undefined, autoClose: undefined });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      {/* <NotificationForm /> */}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 'f15px' }}
      >
        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="notification-msg">Текст уведомления:</label>
          <input
            type="text"
            id="notification-msg"
            value={notification.message}
            onChange={(e) => handleChange('message', e.target.value)}
            style={{ padding: '8px' }}
          />
        </div>

        {/* Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="notification-time">Автозакрытие (мс):</label>
          <input
            type="number"
            id="notification-time"
            value={notification.autoClose ?? ''}
            onChange={(e) => handleChange('autoClose', Number(e.target.value) || 0)}
            style={{ padding: '8px' }}
            placeholder="Необязательно"
          />
        </div>

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Добавить
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Список:</h3>
        {state.notifications.length > 0 && <button onClick={() => clearAll()}>Очистить всё</button>}
      </div>

      <div style={{ marginTop: '15px' }}>
        {state.notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
