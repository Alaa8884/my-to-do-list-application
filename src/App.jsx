import { useEffect, useState } from "react";
import Logo from "./components/logo";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";

export default function App() {
  const [tasks, setTasks] = useState(function () {
    const storedTask = localStorage.getItem("tasks");
    return JSON.parse(storedTask) || [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);


  function handleAddTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(addTime) {
    setTasks((tasks) => tasks.filter((task) => task.addTime !== addTime));
  }

  function handleToggleTask(addTime) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.addTime === addTime
          ? { ...task, completedTask: !task.completedTask }
          : task
      )
    );
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleConfirmDelete() {
    setIsModalOpen(false);
    return setTasks([]);
  }

  useEffect(
    function () {
      function close(e) {
        if (e.code === "Escape" && isModalOpen) {
          handleCloseModal();
        }
      }
      document.addEventListener("keydown", close);
      return function () {
        document.removeEventListener("keydown", close);
      };
    },
    [isModalOpen]
  );

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );


  return (
    <div className="app">
      <Logo />
      <Form onAddTasks={handleAddTasks} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onOpenModal={handleOpenModal}
        onConfirmDelete={handleConfirmDelete}
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      />
      <Stats tasks={tasks} />
    </div>
  );
}
