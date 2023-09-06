import { useState } from "react";

type Task = {
  completed: boolean;
  description: string;
};

const DEFAULT_TASKS = [
  { completed: true, description: "Standup at 9:30am" },
  { completed: false, description: "Interview with Mike" },
  { completed: false, description: "Lunch meeting with Sean and Matt" },
];

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [newTaskInput, setNewTaskInput] = useState("");

  const onChange = (task: Task) => {
    task.completed = !task.completed;
    setTasks([...tasks]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setTasks([
      ...tasks,
      {
        completed: false,
        description: newTaskInput,
      },
    ]);
    setNewTaskInput("");
  };

  return (
    <div className={`flex min-h-screen flex-col p-24`}>
      {tasks.map((task) => {
        return (
          <div key={task.description} className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                onChange(task);
              }}
            />
            <div className="ml-2">{task.description}</div>
          </div>
        );
      })}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
        />
        <input type="submit" value="Create task" />
      </form>
    </div>
  );
}
