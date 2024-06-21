import { useState } from "react";

export default function Form({ onAddTasks }) {
  const [description, setDescription] = useState("");
  const [requiredTime, setRequiredTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newTask = {
      description,
      requiredTime,
      completedTask: false,
      addTime: Date.now(),
    };

    if (!newTask.requiredTime) return null;
    onAddTasks(newTask);
    setDescription("");
    setRequiredTime("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} id="task-form">
      <h2>What's Your Plan Today?</h2>
      <div className="inputs">
        <div>
          <input
            type="text"
            id="task-input"
            placeholder="Add a New Task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            id="time-input"
            placeholder="How many minutes need ?"
            value={requiredTime}
            onChange={(e) => setRequiredTime(+e.target.value)}
          />
        </div>
        <button>Add</button>
      </div>
    </form>
  );
}
