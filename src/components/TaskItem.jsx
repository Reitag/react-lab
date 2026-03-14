export default function TaskItem(props) {
  const { id, text, done, onDelete, onTaskComplete } = props;

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px',
      }}
    >
      <input
        type="checkbox"
        id={id}
        checked={done}
        onChange={(event) => {
          onTaskComplete(id, event.target.checked);
        }}
      />
      <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}
