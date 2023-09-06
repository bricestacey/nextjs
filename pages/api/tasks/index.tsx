import { type NextApiHandler } from "next";

type Task = {
  completed: boolean;
  description: string;
};

type Data = {
  status: string;
  tasks: Task[];
};

const DEFAULT_TASKS = [
  { completed: true, description: "Standup at 9:30am" },
  { completed: false, description: "Interview with Mike" },
  { completed: false, description: "Lunch meeting with Sean and Matt" },
];

const handler: NextApiHandler<Data> = (req, res) => {
  if (req.method === "POST") {
    DEFAULT_TASKS.push({ completed: false, description: req.body.description });
  }

  if (req.method === "PUT") {
    const task = DEFAULT_TASKS.find(
      (task) => task.description === req.body.description
    );
    if (task) {
      task.completed = !task.completed;
    }
  }

  res.status(200).json({ status: "ok", tasks: DEFAULT_TASKS });
};

export default handler;
