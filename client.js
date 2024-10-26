const socket=io('http://localhost:8000');

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});



const form=document.getElementById("send-container");
const messageinput=document.getElementById("messageinp")
const messagecontainer=document.querySelector(".container")
var audio=new Audio('ting.mp3');
const append=(message,position)=>{
  const messagElement=document.createElement('div');
  messagElement.innerText=message;
  messagElement.classList.add('message',position);
  messagecontainer.append(messagElement);
  if(position=='right'){
    audio.play();
  }
}
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  const message=messageinput.value;
  append(`you:${message}`,'left');
  socket.emit('send',message);
  messageinput.value='';
  audio.play().catch(error => console.error('Audio playback failed:', error));
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.on('user-joined',name=>{
  append(`${name} joined the chat`, 'left')


});
socket.on('receive',data=>{
  append(`${data.name}:${data.message}`, 'right')
})
socket.on('user-left',name=>{
  append(`${name}:left the chat`, 'right')
})


