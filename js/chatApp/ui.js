const roomButtons = document.getElementById("roomButtons");
const roomsBlock = document.getElementById("rooms");

const renderMessage = (message, messageId, id) => {
    this.messages = document.getElementById(`${id}Messages`);

    let html = `<li class="message" id="${messageId}">
                <span class="name">${message.username}</span> <span>${message.message}</span>
                <div class="date">${message.started_at}</div>
            </li>`;

    messages.innerHTML += html;
};

const renderRoom = (room) =>{

    let htmlButton = `<button class="" id="${room.id}Button">${room.name}</button>`;
    let htmlRoom = room.list;
    roomButtons.innerHTML += htmlButton;
    roomsBlock.innerHTML += htmlRoom;

    };


const showRoom = (target) => {
    let rooms = document.getElementsByClassName("chat");

    let buttons = Array.from(roomButtons.children);
    if(target !== roomButtons){
        buttons.forEach(button => {
                button.classList.remove("pressed");
                if (!(target.classList[0] === "pressed")) {
                    target.classList.add("pressed");

                }

            }
        );
    }

    rooms = Array.from(rooms);

    rooms.forEach(room =>{
        if(target.id.includes(room.id)){
            const roomToShow = document.getElementById(room.id);

            rooms.forEach(room => {
                const roomToHide = document.getElementById(room.id);
                roomToHide.classList.add("d-none");
            });

            roomToShow.classList.remove("d-none");
        }
    });
};
// const chats = new Chat();

roomButtons.addEventListener("click", e => {
    e.preventDefault();
    showRoom(e.target);

});


