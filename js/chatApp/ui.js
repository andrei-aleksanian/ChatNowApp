const roomButtons = document.getElementById("roomButtons");
const roomButtonsSide = document.getElementById("roomButtonsSideBar");
const roomsBlock = document.getElementById("rooms");
const sendMessageForm = document.getElementById("addMessageForm");
const changeNicknameFrom = document.getElementById("changeNameForm");

const allRoomNames = new Set();

const unrenderTopMessage = (roomName) =>{
    const room = document.getElementById(`${roomName}Messages`);

    room.children[0].remove();
};

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
    let htmlButton = `<button class="" id="${room.id}Button">${room.name}</button>`;
    let htmlButtonSide = `<button class="" id="${room.id}ButtonSide">${room.name}</button>`;

    let htmlRoom = room.list;
    roomButtons.innerHTML += htmlButton;
    roomButtonsSide.innerHTML += htmlButtonSide;
    roomsBlock.innerHTML += htmlRoom;
    allRoomNames.add(room);

    };

const render_name = () =>{
    // show little name on top of forms
    const username = document.getElementById("username");
    username.innerText =  localStorage.getItem("username") ? localStorage.getItem("username") : "anon";
};

const colourButtons = (buttons, buttonsSide, target) => {
    buttons.forEach(button => {
       button.classList.remove("pressed");
       if (!(target.classList[0] === "pressed")){
           target.classList.add("pressed");

           buttonsSide.forEach(buttonSide => {
              buttonSide.classList.remove("pressed");
              if(buttonSide.id === `${button.id}Side` || button.id === `${buttonSide.id}Side`){
                  buttonSide.classList.add("pressed");
              }
           });
       }
    });
};

const showButton = (target) => {
    let buttons = Array.from(roomButtons.children);
    let buttonsSide = Array.from(roomButtonsSide.children);

    if(target.parentElement.id === roomButtons.id) {
        colourButtons(buttons, buttonsSide, target);

    }else if (target.parentElement.id === roomButtonsSide.id){
        colourButtons(buttonsSide, buttons, target);
    }

};

const showRoom = (target) => {
    let rooms = document.getElementsByClassName("chat");
    showButton(target);
    // showButton(target);

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

roomButtonsSide.addEventListener("click", e => {
   e.preventDefault();
   showRoom(e.target);
});