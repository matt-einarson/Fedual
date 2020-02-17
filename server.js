const colyseus = require("colyseus");
const http = require("http");
const express = require("express");
const port = process.env.port || 3000;


const app = express();
app.use(express.json());

const gameServer = new colyseus.Server({
  server: http.createServer(app),
});

class BattleRoom extends Room {
  oncreate(options) {
    //check if an option has been selected and do something
  }
  onjoin(client, options) {
    //Do something when a client joins
  }
}

//I want to be able to chat as well as play
gameServer.define("battle", BattleRoom);
gameServer.define("chat", ChatRoom);


gameServer.listen(port);
