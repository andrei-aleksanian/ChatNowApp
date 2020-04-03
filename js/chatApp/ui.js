const roomButtons = document.getElementById("roomButtons");
const roomsBlock = document.getElementById("rooms");
const sendMessageForm = document.getElementById("addMessageForm");
const changeNicknameFrom = document.getElementById("changeNameForm");

const allRoomNames = new Set();

const renderMessage = (message, messageId, id) => {
    const messages = document.getElementById(`${id}Messages`);
    const when = dateFns.distanceInWordsToNow(
        message.started_at.toDate(),
        {addSuffix: true}
    );

    let html = `<li class="message" id="${messageId}">
                <span class="name">${message.username}</span> <span>${message.message}</span>
                <div class="date">${when}</div>
            </li>`;

    messages.innerHTML += html;
};

const renderRoom = (room) =>{
    console.log(room);
    let htmlButton = `<button class="" id="${room.id}Button">${room.name}</button>`;
    let htmlRoom = room.list;
    roomButtons.innerHTML += htmlButton;
    roomsBlock.innerHTML += htmlRoom;
    allRoomNames.add(room);

    };

const render_name = () =>{
    // show little name on top of forms
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

roomButtons.addEventListener("click", e => {
    e.preventDefault();
    showRoom(e.target);

});
