// need to listen to changes and every time there is a change, update ui,
//on snapshot bla bla bla

class App{
    constructor(){
        this.allUsers = [];
        this.allRooms = [];

    }

    async getUsers(){
        const response = await db.collection("users").get();
        const docs = await response.docs;

        return docs;
    }

    async getRooms(){
        const response = await db.collection("rooms").get();
        const docs = await response.docs;

        return docs;
    }

    setupUser(doc){
        const user = doc.data();

        const new_user = new User(user.name, doc.id);
        this.allUsers.push(new_user);
    }

    setupRoom(doc){
        const room = doc.data();
        // console.log(room, doc);

        const new_room = new Chat(room.name, doc.id);
        this.allRooms.push(new_room);
        renderRoom(new_room);

    }
}

// Setting up existing rooms and users
const chat_now = new App();

chat_now.getUsers()
    .then(docs => {
        docs.forEach(doc => {
            chat_now.setupUser(doc);
        });

        console.log("all users added from database");
    })
    .catch(err => console.log(err));

chat_now.getRooms()
    .then(docs => {
        docs.forEach(doc => {
            chat_now.setupRoom(doc);
        });
        console.log("all rooms added from database");

        const button = document.getElementById("G7AMPliMVCISNZMY4vXBButton");  // general chat key
        showRoom(button);

        chat_now.allRooms.forEach(room => {

            // I get and then display messages from the database
            room.getMessages()
                .then(docs => {
                    docs.forEach(doc => {
                        room.displayMessage(doc);
                    });
                })
                .catch(err => console.log(err));
        });

    })
    .catch(err => console.log(err));