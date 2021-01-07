const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const userList = document.querySelector("#users");

// Get username and room from URL using the QS library 
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// // Join chatroom configuration
socket.emit('joinRoom', { username, room });

// // Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', message => {

   outputMessage(message);

  // Scroll down function for new messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

//   // Get message text
  const msg = e.target.elements.msg.value;
 
//   msg = msg.trim();
  
//   if (!msg){
//     return false;
//  }

  // Emitting  message to server
  socket.emit('chatMessage', msg);

  // Clear input field 
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
 });

// // Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML= `<p class="meta">${message.username} <span>  ${message.time}</span></p>
  <p class="text"> ${message.text} </p>`; 
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `${users.map(user =>`<li>${user.username}</li>`).join("")}`;
  // users.forEach(user=>{
  //   const li = document.createElement('li');
//   //   li.innerText = user.username;
//   //   userList.appendChild(li);
//    });
  }