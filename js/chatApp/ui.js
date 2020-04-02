const roomButtons = document.getElementById("roomButtons");
const roomsBlock = document.getElementById("rooms");

const renderRoom = (room) =>{

    let htmlButton = `<button class="" id="${room.id}Button">${room.name}</button>`;
    let htmlRoom = `<div class="chat d-none" id="${room.id}">
                    <h2>${room.name}</h2>
                    <ul class="messages">
                    </ul>
                </div>
                `;
    roomButtons.innerHTML += htmlButton;
    roomsBlock.innerHTML += htmlRoom;

    };


const udateUI = (changes) => {
    console.log(changes);
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

    console.log(rooms);
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

