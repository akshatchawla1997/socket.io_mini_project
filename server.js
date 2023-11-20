const Express = require('express')
const { dirname } = require('path')
const app = Express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

app.use(Express.static(__dirname+'/src'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

http.listen(PORT,()=>{
    console.log(`listening on port number ${PORT}`)
})


// Socket

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log("connected");
    socket.on("message", (msg)=>socket.broadcast.emit('message',msg))
})
