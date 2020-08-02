const Koa = require('koa');
const IO = require('koa-socket-2');
 
const app = new Koa();
const io = new IO();

 
io.attach(app);

io.on('connection', (socket) => {
    console.log('connect from : ', socket.id);
})
 
io.on('message', (ctx, data) => {
    console.log('message : ', data);
});

io.on('order', (ctx, data) => {
  console.log('order : ', data);
  io.broadcast('order', JSON.stringify({ order: data }))
});
 
app.listen(4003);