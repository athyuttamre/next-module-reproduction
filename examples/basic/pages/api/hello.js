import { Authik } from "@authik/next/server";

export default function handler(_req, res) {
  Authik();
  res.json({ hello: "world" });
}
