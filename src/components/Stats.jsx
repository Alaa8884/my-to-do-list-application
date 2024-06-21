export default function Stats({ tasks }) {
  if (!tasks.length)
    return (
      <footer className="stats">
        {" "}
        {`A year from now you may wish you had started today 😞`}
      </footer>
    );
  const numTasks = tasks.length;
  const completeTasks = tasks.filter((task) => task.completedTask).length;
  const percentage = Math.round((completeTasks / numTasks) * 100);
  
  return (
    <footer className="stats">
      <div>
        {percentage === 100
          ? `Good work, All tasks have been completed 🦸‍♂️`
          : `You have ${
              numTasks === 1
                ? `one task `
                : `${numTasks} tasks `
            }  on your list, ${
              completeTasks
                ? `you already complited ${completeTasks}`
                : `Complited ${completeTasks} `
            } 
        ( ${percentage} %)`}
      </div>
    </footer>
  );
}
