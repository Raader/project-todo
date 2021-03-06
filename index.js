const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

//create express app
const app = express();

//use routes for all routes besides the main route
const routes = require("./routes/routes");
app.use(express.json()); //json body parser
app.use("/api", routes);

//connect to mongoDB database
const dbURI = config.get("dbURI");
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
//catch connection errors and log activity
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connected to the database");
});

//serve client
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
//start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running at port: " + port));
module.exports = app;
