import { useState } from "react";
import Task from "./Task";
import Modal from "./Modal";

function TaskList({
  tasks,
  onDeleteTask,
  onToggleTask,
  onOpenModal,
  onConfirmDelete,
  isModalOpen,
  onCloseModal,
}) {
  const [filterBy, setFilterBy] = useState("input");

  let filterTasks;

  if (filterBy === "input") filterTasks = tasks;

  if (filterBy === "completed")
    filterTasks = tasks
      .slice()
      .filter((filterTasks) => filterTasks.completedTask);

  if (filterBy === "big-task")
    filterTasks = tasks
      .slice()
      .filter((filterTasks) => filterTasks.requiredTime > 60);

  function calculateTotalTime() {
    const totalMinutes = filterTasks
      .filter((task) => !task.completedTask)
      .map((task) => task.requiredTime)
      .reduce((acc, cur) => acc + cur, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }

  const { hours, minutes } = calculateTotalTime();
  return (
    <div className="list">
      {tasks.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>NO.</th>
              <th rowSpan={2}>Task</th>
              <th colSpan={2}>Required Time</th>
              <th colSpan={2}>Actions</th>
            </tr>
            <tr>
              <th>Hour</th>
              <th>Minute</th>
              <th>Completed</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterTasks.map((task) => (
              <Task
                tasks={tasks}
                task={task}
                onDeleteTask={onDeleteTask}
                onToggleTask={onToggleTask}
                key={task.addTime}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total Required Time</td>
              <td>{hours < 10 ? `0${hours}` : hours} H</td>
              <td>{minutes < 10 ? `0${minutes}` : minutes} M</td>
              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <h3>Your To Do list is empty</h3>
      )}
      <div className="filters">
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          choose your tasks
          <option value="input">all-tasks</option>
          <option value="big-task">Big Tasks</option>
          <option value="completed">Completed tasks</option>
        </select>
        <button onClick={onOpenModal}>Clear Tasks</button>
        {isModalOpen && (
          <Modal
            onCloseModal={onCloseModal}
            onConfirmDelete={onConfirmDelete}
          />
        )}
        {isModalOpen && <div className="over-lay" onClick={onCloseModal}></div>}
      </div>
    </div>
  );
}
export default TaskList;
