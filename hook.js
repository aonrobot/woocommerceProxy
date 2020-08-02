const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const HttpStatus = require("http-status");
const WebSocket = require('ws');

const app = new Koa();

const PORT = process.env.PORT || 4002;

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const http = new Router();

var socket = require('socket.io-client')('ws://localhost:4003');

socket.on('connect', function(){
  console.log('Connected to websocket server')
  socket.send('hello server from hook')
});

http.post("/", async (ctx, next)=>{
  ctx.status = HttpStatus.OK;
  const body = ctx.request.body;

  try {
    console.log('body', body)
    socket.emit('order', JSON.stringify(body))
    ctx.body = 'ok';
  } catch(err) {
    ctx.body = err;
  }
  await next();
});

app.use(http.routes()).use(http.allowedMethods());

app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});



