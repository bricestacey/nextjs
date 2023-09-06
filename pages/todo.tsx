import { useState } from "react";
import useSWR from "swr";
import useSWRMutate from "swr/mutation";

type Task = {
  completed: boolean;
  description: string;
};

export default function TodoList() {
  const { data, isLoading, error } = useSWR("/api/tasks", async () => {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response.json();
  });

  const { trigger: triggerCreate } = useSWRMutate(
    "/api/tasks",
    async (key, { arg }: { arg: string }) => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: arg,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response.json();
    }
  );

  const { trigger: triggerToggle } = useSWRMutate(
    "/api/tasks",
    async (key, { arg }: { arg: Task }) => {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: arg.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response.json();
    }
  );

  const [newTaskInput, setNewTaskInput] = useState("");

  const onChange = (task: Task) => {
    triggerToggle(task);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    triggerCreate(newTaskInput);
    setNewTaskInput("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className={`flex min-h-screen flex-col p-24`}>
      {data.tasks.map((task, index) => {
        return (
          <div key={index} className="flex items-center">
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
