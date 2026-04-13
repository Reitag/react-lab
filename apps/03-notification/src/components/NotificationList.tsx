import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from './NotificationItem';
import { useState } from 'react';

interface NotificationFormState {
  message: string;
  autoClose: number | undefined;
}

export function NotificationList(): React.ReactNode {
  const [value, setValue] = useState<NotificationFormState>({ message: '', autoClose: undefined });
  const { state, addNotification, clearAll } = useNotifications();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value: inputValue } = event.target;

    setValue((prev) => ({
      ...prev,
      [id === 'notification-msg' ? 'message' : 'autoClose']:
        id === 'notification-time' ? (inputValue ? Number(inputValue) : undefined) : inputValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.message.trim()) {
      addNotification({
        type: 'info',
        message: value.message,
        autoClose: value.autoClose,
      });
      setValue({ message: '', autoClose: undefined });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="notification-msg">Текст уведомления:</label>
          <input
            type="text"
            id="notification-msg"
            value={value.message}
            onChange={handleChange}
            style={{ padding: '8px' }}
          />
        </div>

        {/* Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="notification-time">Автозакрытие (мс):</label>
          <input
            type="number"
            id="notification-time"
            value={value.autoClose ?? ''}
            onChange={handleChange}
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
        {state.notifications.map((item) => (
          <div
            key={item.id}
            style={{ marginBottom: '10px', borderLeft: '3px solid blue', paddingLeft: '10px' }}
          >
            <NotificationItem id={item.id} message={item.message} />
          </div>
        ))}
      </div>
    </div>
  );
}
