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

    case "/sign-in":
      getStaticFileContent(res, "pages/sign-in.html", "text/html");

      break;

    case "/authenticate":
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        res.writeHead(301, { location: "/home" });
        res.end();
      });

      break;

    case "/home":
      getStaticFileContent(res, "pages/home.html", "text/html");
      break;

    case "/global.css":
      getStaticFileContent(res, "styles/global.css", "text/css");
      break;

    case "/sign-in.css":
      getStaticFileContent(res, "styles/pages/sign-in.css", "text/css");
      break;

    default:
      res.writeHead(404);
      res.write("Not found");
      res.end();
      break;
  }
});

function getStaticFileContent(res, filePath, contentType) {
  filePath = path.resolve(__dirname, filePath);

  readFile(filePath, (err, file) => {
    if (err) {
      res.writeHead(500, "Internal server error");
      res.end();
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });

    res.end(file);
  });
}

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}/`);
});
