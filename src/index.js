const express = require("express");
const globalRoutes = require("./router/index");

const app = express();

const server = globalRoutes(app);

const port = 3000;
server.listen(port, () => console.log(`Server is running in port ${port}`));