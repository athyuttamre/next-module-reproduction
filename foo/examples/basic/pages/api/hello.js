import { Server } from "repro/server";

export default function handler(_req, res) {
  Server();
  res.json({ hello: "world" });
}
