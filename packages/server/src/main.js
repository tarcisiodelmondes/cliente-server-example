import { readFile } from "fs";
import { createServer } from "http";
import path from "path";
import { parse } from "querystring";

const server = createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          name: "Tarcisio",
          lastName: "Delmondes",
        })
      );
      res.end();
      break;

    case "/authenticate":
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        res.end();
      });

      break;

    default:
      res.writeHead(404);
      res.write("Not found");
      res.end();
      break;
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}/`);
});
