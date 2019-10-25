const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

process.env["AUTHENTICATE_KEY"] = "devKey" // should be stored more securely in production env

const app = express();
const path = require('path');

const controller = require('./controller');
controller.connect(app);

//setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env["AUTHENTICATE_KEY"]));
app.use("/", routes(app));
app.use(express.static("./public"));

app.listen(3000);

console.log('Express on 3000');

console.log("Setting up game module")
const game = require("./game");
game.startGame(app)

module.exports = app;
