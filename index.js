//node server which handle sockt io connections
const io = require('socket.io')(8000,{
    cors: {
        origin: '*',  
        methods: ['GET', 'POST']
    }
}); 
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined', name => {
        users[socket.id] = name;  
        console.log(`${name} has joined the chat`);
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });

   socket.on('disconnect', () => {
        const userName = users[socket.id];
        if (userName) {
            socket.broadcast.emit('user-left', userName);
            console.log(`${userName} has left the chat`);
            delete users[socket.id]; 
        }
    })
});
