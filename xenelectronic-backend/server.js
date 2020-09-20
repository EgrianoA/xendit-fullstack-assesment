const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const port = process.env.PORT;

console.log(`Server PID: ${process.pid}, Port: ${port}`);
server.listen(port);
