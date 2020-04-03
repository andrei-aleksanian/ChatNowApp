// need to listen to changes and every time there is a change, update ui,
//on snapshot bla bla bla

class App{
    constructor(){
        this.allUsers = [];
        this.allRooms = [];
        this.start = true;
    }

    updateMessage(doc){
        const data = doc.data();
        this.allRooms.forEach(room => {
           if(room.name === data.room){
               room.getMessage(data);
           }else{
               console.log("chat doesn't exist");
           }

        });
    }

    // creating chats
    // displaying them
    setupRoom(doc){
        const name = doc.data().room;

        const new_room = new Chat(name);
        this.allRooms.push(new_room);
        renderRoom(new_room);
    }

    // get the button for chat general to imitate pressing it later
    getGeneralButton(){
        let id = "";
        this.allRooms.forEach(room => {
           if(room.name === "General"){
               id = room.id;
           }
        });
        return document.getElementById(`${id}Button`);
    }

    deleteMessage(doc){
        db.collection("chats").doc(doc.id).delete();
    }

    createUser(name){
        const new_user = new User(name);
        this.allUsers.push(new_user);
        return this;
    }

    change_name(name){
        const names = this.allUsers.map(n => {return n.name});
        if(!names.includes(name)){
            this.createUser(name);
        }
    }

}

// Setting up existing rooms and users
const chat_now = new App();

// Fire on every database update
const stopRealTimeUpdates = db.collection("chats").onSnapshot(sn => {
    let messages = [];
    let room_exists = false;

    sn.docChanges().forEach(change => {
       if(change.type === "added"){
           const data = change.doc.data();
            messages.push(data);
           // getting messageS
           // if room exists already
           chat_now.allRooms.forEach(room => {
               if (room.name === data.room){

                   chat_now.updateMessage(change.doc);
                   room_exists = true;
               }
           });

           // creating a room first, then getting the messagE
           // if it didn't exist before
           if(!room_exists){
               chat_now.setupRoom(change.doc);
               chat_now.updateMessage(change.doc);
           }
            room_exists = false;
       }
    });


    // after everything is added, general is always added first,
    // so always only at the start switch the layout to it
    chat_now.allRooms.forEach(room => {
        const oneRoomMessages = messages.filter(m => m.room === room.name);

        if(room.name === "General" && chat_now.start){
            showRoom(chat_now.getGeneralButton());
            chat_now.start = false;
        }

        if(oneRoomMessages){
            console.log(oneRoomMessages);
            room.sortByTimeStamp(oneRoomMessages);

        }
    });
});

changeNicknameFrom.addEventListener("submit", e => {
    e.preventDefault();
    const name = changeNicknameFrom.changeName.value.trim();

    chat_now.change_name(name);
    localStorage.setItem("username", name);

    render_name();
    changeNicknameFrom.reset();

});

sendMessageForm.addEventListener("submit", e => {
    e.preventDefault();
    const currentRoomName = document.getElementsByClassName("pressed")[0].innerText;
    const text = sendMessageForm.addMessage.value.trim();
    const username =  localStorage.getItem("username") ? localStorage.getItem("username") : "anon";

    allRoomNames.forEach(room =>{
        if(room.name === currentRoomName){
            room.addMessage(text, username);
        }
    });

    sendMessageForm.reset();
});
