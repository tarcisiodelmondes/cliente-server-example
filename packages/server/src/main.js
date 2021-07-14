import express from "express";
import cors from "cors";

const server = express();

const configCors = {
  origin: "http://localhost:3000",
};

server.use(cors(configCors));
server.use(express.json());
server.options("/authenticate", cors(configCors));

server.get("/status", (_, res) => {
  res.send({ status: "okay" });
});

server.post("/authenticate", (_, res) => {
  res.send({ received: "Ok" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}/`);
});
