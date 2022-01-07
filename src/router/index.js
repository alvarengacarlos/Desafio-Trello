const bodyParser = require("body-parser");
const listRoutes = require("./list");

const globalRoutes = (app) => {
    app.use("/", bodyParser.json());          
    app.use(listRoutes);   

    return app;
};

module.exports = globalRoutes;