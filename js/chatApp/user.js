class User{

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.messages = [];

        this.allUsers = db.collection("users");
    }

    getMessages(){
        // this.messages = db.collection...
    }

    addMessage(message){
        //add timestamp and message into object, object to database
    }

    userExists(){
        // how to check if its old or new user?
        console.log();
    }

}