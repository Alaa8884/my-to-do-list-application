export default function Task({ tasks, task, onDeleteTask, onToggleTask }) {
  const order = tasks.indexOf(task) + 1;
  const hour = Math.floor(task.requiredTime / 60);
  const minutes = task.requiredTime % 60;

  return (
    <tr
      style={
        task.completedTask
          ? { textDecoration: "line-through", color: "yellowgreen" }
          : { textDecoration: "none" }
      }
    >
      <td>
        {" "}
        <span className="num">{order}</span>
      </td>
      <td>{task.description}</td>
      <td>{hour < 10 ? `0${hour}` : hour}</td>
      <td>{minutes  < 10 ? `0${minutes}` : minutes}</td>
      <td>
        <input
          type="checkbox"
          value={task.completedTask}
          onChange={() => {
            onToggleTask(task.addTime);
          }}
        />
      </td>
      <td>
        <button onClick={() => onDeleteTask(task.addTime)}>Delete</button>
      </td>
    </tr>
  );
}
