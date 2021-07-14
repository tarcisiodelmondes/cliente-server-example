import express from "express";

const server = express();

server.get("/status", (_, res) => {
  res.send({ status: "okay" });
});

server.post("/authenticate", express.json(), (req, res) => {
  console.log(req.body.email);
  res.send();
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}/`);
});
