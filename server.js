const colyseus = require("colyseus");
const http = require("http");
const express = require("express");
const port = process.env.port || 3000;

const app = express();
app.use(express.json());

const gameServer = new colyseus.Server({
  server: http.createServer(app),
});

//I want to be able to chat as well as play
gameServer.define("battle", BattleRoom);
gameServer.define("chat", ChatRoom);


gameServer.listen(port);
