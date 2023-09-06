import { type NextApiHandler } from "next";

type Data = {
  status: string;
};

const handler: NextApiHandler<Data> = (_req, res) => {
  res.status(200).json({ status: "ok" });
};

export default handler;
